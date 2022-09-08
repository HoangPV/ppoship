<?php

namespace Drupal\ppoship_module\Tests;

use Drupal\simpletest\WebTestBase;
use Drupal\Core\Render\RendererInterface;
use Drupal\ppoship_module\PPOShipServiceInterface;

/**
 * Provides automated tests for the ppoship_module module.
 */
class VisionControllerTest extends WebTestBase {

  /**
   * Drupal\Core\Render\RendererInterface definition.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * Drupal\ppoship_module\PPOShipServiceInterface definition.
   *
   * @var \Drupal\ppoship_module\PPOShipServiceInterface
   */
  protected $pposhipModuleCommon;


  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return [
      'name' => "ppoship_module VisionController's controller functionality",
      'description' => 'Test Unit for module ppoship_module and controller VisionController.',
      'group' => 'Other',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
  }

  /**
   * Tests ppoship_module functionality.
   */
  public function testVisionController() {
    // Check that the basic functions of module ppoship_module.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via Drupal Console.');
  }

}
