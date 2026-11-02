<?php
/**
 * APPZIO Auth & Security Helper
 * Handles admin session tokens and password verification
 */

class Auth {
    private static string $secretKey = 'APPZIO_SECRET_KEY_@2026_SECURE_TOKEN_#JWT_HASH';

    public static function createToken(array $payload, int $expirySeconds = 86400 * 7): string {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['exp'] = time() + $expirySeconds;
        $payload['iat'] = time();
        $payloadJson = json_encode($payload);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payloadJson));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secretKey, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function verifyToken(?string $token): ?array {
        if (!$token) {
            return null;
        }

        // Strip Bearer prefix if present
        if (str_starts_with($token, 'Bearer ')) {
            $token = substr($token, 7);
        }

        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$headerB64, $payloadB64, $sigB64] = $parts;

        // Verify signature
        $expectedSig = hash_hmac('sha256', $headerB64 . "." . $payloadB64, self::$secretKey, true);
        $expectedSigB64 = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($expectedSig));

        if (!hash_equals($expectedSigB64, $sigB64)) {
            return null;
        }

        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payloadB64)), true);
        if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
            return null;
        }

        return $payload;
    }

    public static function requireAdmin(): array {
        $authHeader = null;

        if (function_exists('getallheaders')) {
            $headers = getallheaders();
            $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;
        }

        if (!$authHeader) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'] 
                ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] 
                ?? $_SERVER['Authorization'] 
                ?? null;
        }

        if (!$authHeader && isset($_COOKIE['appzio_token'])) {
            $authHeader = $_COOKIE['appzio_token'];
        }

        $user = self::verifyToken($authHeader);
        if (!$user) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Unauthorized access. Please login to continue.'
            ]);
            exit;
        }

        return $user;
    }
}
