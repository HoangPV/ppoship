<?php

namespace Drupal\ppoship_module;

/**
 * Interface PPOShipServiceInterface.
 * @author Hoang Phan <ace@hoangphan.tech>
 */
interface PPOShipServiceInterface
{
  /**
   * Returns config of block id
   *
   * @param string $key
   * @return string
   */
  public function getBlockAssignId(string $key = ''): string;

  /**
   * Returns a rendered array of a block
   *
   * @param int $id
   * @return array
   */
  public function getRenderedArrayCustomBlock(int $id = 0): array;

  /**
   * Returns menu items of topnav on about us page
   *
   * @return array
   */
  public function getTopNav(): array;
}
