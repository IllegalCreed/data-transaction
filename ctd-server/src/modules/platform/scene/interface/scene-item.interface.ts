import { BaseScene } from './base-scene.interface';

export type SceneItem = Omit<
  BaseScene,
  'summary' | 'headerImageUrl' | 'link' | 'content'
>;
