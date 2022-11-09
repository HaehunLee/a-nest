import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Channels } from '../../entities/Channels';
import { Workspaces } from '../../entities/Workspaces';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager, // random data 생성 시
  ): Promise<any> {
    const workspaceRepository = dataSource.getRepository(Workspaces);
    await workspaceRepository.insert([
      {
        id: 1,
        name: 'Sleact',
        url: 'sleact',
      },
    ]);
    const channelsRepository = dataSource.getRepository(Channels);
    await channelsRepository.insert([
      { id: 1, name: '일반', WorkspaceId: 1, private: false },
    ]);
  }
}
