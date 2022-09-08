<?php

namespace Drupal\ppoship_module\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class AboutController.
 * @author Hoang Phan <ace@hoangphan.tech>
 */
class AboutController extends ControllerBase {

  /**
   * Drupal\Core\Render\RendererInterface definition.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * Drupal\views\ViewsData definition.
   *
   * @var \Drupal\views\ViewsData
   */
  protected $viewsViewsData;

  /**
   * Drupal\ppoship_module\PPOShipServiceInterface definition.
   *
   * @var \Drupal\ppoship_module\PPOShipServiceInterface
   */
  protected $pposhipModuleCommon;

  /**
   * @var \Drupal\path_alias\AliasManagerInterface
   */
  protected $aliasManager;

  const ID_ABOUT = 'block_about';

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $instance = parent::create($container);
    $instance->renderer = $container->get('renderer');
    $instance->viewsViewsData = $container->get('views.views_data');
    $instance->pposhipModuleCommon = $container->get('ppoship_module.common');
    $instance->aliasManager = $container->get('path_alias.manager');
    return $instance;
  }

  /**
   * Render.
   *
   * @return string
   */
  public function render() {
    $blockAboutUsId = $this->pposhipModuleCommon->getBlockAssignId(self::ID_ABOUT);
    $blockAboutUs = $this->pposhipModuleCommon->getRenderedArrayCustomBlock($blockAboutUsId);
    $topNavItems = $this->pposhipModuleCommon->getTopNav();
    $topNav = [];
    foreach ($topNavItems as $index0 => $item) {
      $current = false;
      $path = $this->aliasManager->getPathByAlias($item['link']);
      if ($path === '/ppoship_module/render/about') {
        $current = true;
      }
      $topNav['element_'.$index0] = [
        '#prefix' => $current ? '<li class="current">': '<li>',
        '#suffix' => '</li>',
        'content' => [
          '#prefix' => '<a href="'.$item['link'].'">',
          '#suffix' => '</a>',
          'content' => [
            '#prefix' => '<span>',
            '#suffix' => '</span>',
            '#markup' => $item['name']
          ]
        ]
      ];
    }
    $topNav = $this->renderer->render($topNav);
    return [
      '#type' => 'markup',
      'topnav' => [
        '#prefix' => '<div class="menuTab hidden-sm hidden-xs">',
        '#suffix' => '</div>',
        'ul' => [
          '#prefix' => '<ul>',
          '#suffix' => '</ul>',
          '#markup' => $topNav
        ]
      ],
      'selectj' => [
        '#prefix' => '<div class="select-j hidden-lg hidden-md">',
        '#suffix' => '</div>',
        'title' => [
          '#prefix' => '<div class="title">',
          '#suffix' => '</div>',
          '#markup' => t('Pick a category')
        ],
        'content' => [
          '#prefix' => '<div class="content">',
          '#suffix' => '</div>',
          'ul' => [
            '#prefix' => '<ul>',
            '#suffix' => '</ul>',
            '#markup' => $topNav
          ]
        ]
      ],
      'content' => $blockAboutUs
    ];
  }
}
