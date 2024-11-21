<?php

namespace Drupal\mautic_content_integration\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form for configuring Mautic integration settings.
 */
class MauticSettingsForm extends ConfigFormBase {

    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames() {
        return ['mautic_content_integration.settings'];
    }

    /**
     * {@inheritdoc}
     */
    public function getFormId() {
        return 'mautic_content_integration_settings';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        $config = $this->config('mautic_content_integration.settings');

        $form['mautic_api_url'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Mautic API URL'),
        '#default_value' => $config->get('mautic_api_url') ?? '',
        '#description' => $this->t('Enter the base URL for your Mautic instance. Example: https://mautic.example.com'),
        '#required' => TRUE,
        ];

        $form['mautic_api_token'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Mautic API Token'),
        '#default_value' => $config->get('mautic_api_token') ?? '',
        '#description' => $this->t('Enter the API token for authenticating with Mautic.'),
        '#required' => TRUE,
        ];

        return parent::buildForm($form, $form_state);
    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        $this->config('mautic_content_integration.settings')
        ->set('mautic_api_url', $form_state->getValue('mautic_api_url'))
        ->set('mautic_api_token', $form_state->getValue('mautic_api_token'))
        ->save();

        parent::submitForm($form, $form_state);
    }
    }