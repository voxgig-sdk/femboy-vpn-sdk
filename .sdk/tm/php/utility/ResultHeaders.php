<?php
declare(strict_types=1);

// FemboyVpn SDK utility: result_headers

class FemboyVpnResultHeaders
{
    public static function call(FemboyVpnContext $ctx): ?FemboyVpnResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
