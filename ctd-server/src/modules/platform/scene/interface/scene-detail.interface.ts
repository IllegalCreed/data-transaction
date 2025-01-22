import { BaseScene } from './base-scene.interface';

export interface SceneDetail extends Omit<BaseScene, 'companyName'> {
  company: {
    id: number;
    name: string;
  };
}
