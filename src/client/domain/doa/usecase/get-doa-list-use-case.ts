import { DoaRepository, DoaFilterOptions } from "../repository/doa-repository";
import { Doa } from "../entity/doa";

export class GetDoaListUseCase {
  constructor(private readonly repository: DoaRepository) {}

  async execute(options?: DoaFilterOptions): Promise<readonly Doa[]> {
    return this.repository.getDoaList(options);
  }
}
