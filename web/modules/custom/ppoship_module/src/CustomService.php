<?php

namespace Drupal\ppoship_module;

use Drupal\Core\Block\BlockManagerInterface;
use Drupal\Core\Render\RendererInterface;

/**
 * Class CustomService.
 * @author Hoang Phan <ace@hoangphan.tech>
 */
class CustomService implements PPOShipServiceInterface
{
  const ID_TOPNAV = 'about_topnav';
  /**
   * Drupal\Core\Block\BlockManagerInterface definition.
   *
   * @var \Drupal\Core\Block\BlockManagerInterface
   */
  protected $pluginManagerBlock;

  /**
   * Drupal\Core\Render\RendererInterface definition.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * Constructs a new CustomService object.
   */
  public function __construct(BlockManagerInterface $plugin_manager_block, RendererInterface $renderer)
  {
    $this->pluginManagerBlock = $plugin_manager_block;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritDoc}
   */
  public function getBlockAssignId(string $key = ''): string
  {
    if (theme_get_setting($key)) {
      return theme_get_setting($key);
    }

    return 0;
  }

  /**
   * {@inheritDoc}
   */
  public function getRenderedArrayCustomBlock(int $id = 0): array
  {
    $block = \Drupal\block_content\Entity\BlockContent::load($id);
    $render = \Drupal::entityTypeManager()->getViewBuilder('block_content')->view($block);

    return $render;
  }

  /**
   * {@inheritDoc}
   */
  public function getTopNav(): array
  {
    $result = [];
    $menuId = $this->getBlockAssignId(self::ID_TOPNAV);
    $mids = \Drupal::entityQuery('menu_link_content')
      ->condition('menu_name', $menuId)
      ->execute();
    $controller = \Drupal::entityTypeManager()->getStorage('menu_link_content');
    $entities = $controller->loadMultiple($mids);
    foreach ($entities as $item) {
      $baseUri = (($item->getFields()['link'])->get(0))->uri;
      if (strpos('internal:', $baseUri) != -1) {
        $baseUri = str_replace('internal:', '', $baseUri);
      }
      $title = $item->getTitle();
      $result[] = [
        'name' => $title,
        'link' => $baseUri
      ];
    }

    return $result;
  }
}
