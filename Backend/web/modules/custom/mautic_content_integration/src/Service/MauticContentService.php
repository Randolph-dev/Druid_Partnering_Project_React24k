<?php

namespace Drupal\mautic_content_integration\Service;

use GuzzleHttp\Client;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Exception;

/**
 * Service to fetch user segmentation data from Mautic.
 */
class MauticContentService {

    protected Client $httpClient;
    protected $logger;

    public function __construct(Client $httpClient, LoggerChannelFactoryInterface $loggerFactory) {
        $this->httpClient = $httpClient;
        $this->logger = $loggerFactory->get('mautic_content_integration');
    }

    /**
     * Fetches the user segment from Mautic based on user ID.
     *
     * @param string $userId
     *   The user ID.
     *
     * @return string|null
     *   The user segment (e.g., region) or NULL if not found.
     */
    public function getUserSegment($userId) {
        $mauticApiUrl = 'https://your-mautic-instance.com/api/contacts/' . $userId;
        $apiKey = 'your-api-key-here';

        try {
            // Use the HTTP client to make a GET request.
            $response = $this->httpClient->get($mauticApiUrl, [
                'headers' => [
                    'Api-Auth-Key' => $apiKey,
                    'Content-Type' => 'application/json',
                ],
            ]);

            // Decode the JSON response.
            $data = json_decode($response->getBody()->getContents(), TRUE);
            return $data['contact']['region'] ?? NULL;
        } catch (Exception $e) {
            $this->logger->error('Failed to fetch user segment from Mautic: @message', ['@message' => $e->getMessage()]);
            return NULL;
        }
    }
}