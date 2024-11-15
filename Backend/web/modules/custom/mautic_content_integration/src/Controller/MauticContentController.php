<?php

namespace Drupal\mautic_content_integration\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\mautic_content_integration\Service\MauticContentService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Database\Database;

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
}