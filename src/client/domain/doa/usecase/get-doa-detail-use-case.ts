import { DoaRepository } from "../repository/doa-repository";
import { Doa } from "../entity/doa";

export class GetDoaDetailUseCase {
  constructor(private readonly repository: DoaRepository) {}

  async execute(slug: string): Promise<Doa> {
    return this.repository.getDoaDetail(slug);
  }
}
