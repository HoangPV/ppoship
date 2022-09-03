<?php

namespace Drupal\ppoship_module;
use Drupal\Core\Block\BlockManagerInterface;
use Drupal\Core\Render\RendererInterface;

/**
 * Class CustomService.
 */
class CustomService implements PPOShipServiceInterface {

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
  public function __construct(BlockManagerInterface $plugin_manager_block, RendererInterface $renderer) {
    $this->pluginManagerBlock = $plugin_manager_block;
    $this->renderer = $renderer;
  }

  public function getCustomBlock($blockId=null): string
  {
    $result = '';

    $block  = \Drupal\block_content\Entity\BlockContent::load($blockId);
    if ($block) {
      $result = $block->body->value;
    }

    return $result;
  }

  public function getBlockAssignId(string $key = ''): string
  {
    if (theme_get_setting($key)) {
      return theme_get_setting($key);
    }

    return 0;
  }

  public function getRenderedArrayCustomBlock(int $id = 0): array
  {
    $block = \Drupal\block_content\Entity\BlockContent::load($id);
    $render = \Drupal::entityTypeManager()->getViewBuilder('block_content')->view($block);

    return $render;
  }


}
