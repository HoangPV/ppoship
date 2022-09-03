<?php

namespace Drupal\ppoship_module;

/**
 * Interface PPOShipServiceInterface.
 */
interface PPOShipServiceInterface {
  public function getCustomBlock():string;
  public function getBlockAssignId(string $key=''):string;
  public function getRenderedArrayCustomBlock(int $id=0):array;
}
