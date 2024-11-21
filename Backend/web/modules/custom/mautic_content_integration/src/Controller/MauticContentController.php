<?php

namespace Drupal\mautic_content_integration\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\mautic_content_integration\Service\MauticContentService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Database\Database;
use GuzzleHttp\Exception\RequestException;

class MauticContentController extends ControllerBase {

    protected $mauticService;

    public function __construct(MauticContentService $mauticService) {
        $this->mauticService = $mauticService;
    }

    public static function create(ContainerInterface $container) {
        return new static(
        $container->get('mautic_content_integration.service')
        );
    }

    /**
     * Returns personalized content based on user segment.
     *
     * @param string $userId
     *   The user ID.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     *   The JSON response with personalized content.
     */
    public function getPersonalizedContent($userId) {
        $segment = $this->mauticService->getUserSegment($userId);

        if ($segment) {
        // Fetch content from Drupal based on the segment.
        $connection = Database::getConnection();
        $query = $connection->select('node_field_data', 'n')
            ->fields('n', ['nid', 'title'])
            ->condition('n.status', 1)
            ->condition('n.type', 'article')
            ->condition('n.region', $segment)
            ->execute();

        $content = [];
        foreach ($query as $record) {
            $content[] = [
            'id' => $record->nid,
            'title' => $record->title,
            ];
        }

        return new JsonResponse($content);
        }

        return new JsonResponse(['error' => 'No personalized content found.'], 404);
    }

    /**
    * Handles OAuth callback from Mautic.
    *
    * @param \Symfony\Component\HttpFoundation\Request $request
    *   The incoming request.
    *
    * @return \Symfony\Component\HttpFoundation\Response
    *   The response for the OAuth callback.
    */
    public function handleOAuthCallback(Request $request) {
        $authCode = $request->query->get('code');

        if (!$authCode) {
            // Handle missing or invalid authorization code.
            return new Response('Authorization failed: no code provided.', 400);
        }

        try {
            // Exchange the authorization code for an access token.
            $client = \Drupal::httpClient();
            $response = $client->post('https://your-mautic-instance.com/oauth/v2/token', [
                'form_params' => [
                    'grant_type' => 'authorization_code',
                    'client_id' => 'your-client-id',
                    'client_secret' => 'your-client-secret',
                    'redirect_uri' => 'https://your-site.com/mautic/oauth/callback',
                    'code' => $authCode,
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            // Store the access token and refresh token in Drupal's state system.
            \Drupal::state()->set('mautic_integration.access_token', $data['access_token']);
            \Drupal::state()->set('mautic_integration.refresh_token', $data['refresh_token']);

            return new Response('Authorization successful.');
        } catch (RequestException $e) {
            \Drupal::logger('mautic_content_integration')->error('Token exchange failed: @message', ['@message' => $e->getMessage()]);
            return new Response('Token exchange failed.', 500);
        }
    }
}