<?php

namespace Drupal\mautic_content_integration\Service;

use Drupal\Core\Config\ConfigFactoryInterface;
use GuzzleHttp\Client;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Exception;

/**
 * Service to fetch user segmentation data from Mautic.
 */
class MauticContentService {

    protected Client $httpClient;
    protected $logger;
    protected $config;

    /**
    * Constructor.
    *
    * @param \GuzzleHttp\Client $httpClient
    *   The HTTP Client service.
    * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $loggerFactory
    *   The logger channel factory service.
    * @param \Drupal\Core\Config\ConfigFactoryInterface $configFactory
    *   The configuraiton factory service.
    */

    public function __construct(Client $httpClient, LoggerChannelFactoryInterface $loggerFactory, ConfigFactoryInterface $configFactory) {
        $this->httpClient = $httpClient;
        $this->logger = $loggerFactory->get('mautic_content_integration');
        $this->config = $configFactory->get('mautic_content_integration.settings');
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
        // This retreives Mautic's API configuraiton values.
        $mauticApiUrl = rtrim($this->config->get('mautic_api_url'), '/') . '/api/contacts/' . $userId;
        $apiKey = $this->config->get('mautic_api_token');

        if (!$mauticApiUrl || !$apiKey) {
            $this->logger->error('Mautic API configuration is missing.');
            return NULL;
        }

        try {
            // Use the HTTP client to make a GET request.
            $response = $this->httpClient->get($mauticApiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $apiKey,
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
