import { Container } from "@needle-di/core";
import { TOKENS } from "./tokens";

// Quran
import { QuranRemoteDataSourceImpl } from "@/client/data/quran/data_source/quran-remote-data-source-impl";
import { QuranRepositoryImpl } from "@/client/data/quran/repository/quran-repository-impl";
import { GetQuranSurahListUseCase } from "@/client/domain/quran/usecase/get-quran-surah-list-use-case";
import { GetQuranSurahDetailUseCase } from "@/client/domain/quran/usecase/get-quran-surah-detail-use-case";
import { GetQuranAyahUseCase } from "@/client/domain/quran/usecase/get-quran-ayah-use-case";

// Doa
import { DoaRemoteDataSourceImpl } from "@/client/data/doa/data_source/doa-remote-data-source-impl";
import { DoaRepositoryImpl } from "@/client/data/doa/repository/doa-repository-impl";
import { GetDoaListUseCase } from "@/client/domain/doa/usecase/get-doa-list-use-case";
import { GetDoaDetailUseCase } from "@/client/domain/doa/usecase/get-doa-detail-use-case";

// DeepLink
import { DeepLinkRemoteDataSourceImpl } from "@/client/data/deeplink/data_source/deeplink-remote-data-source-impl";
import { DeepLinkRepositoryImpl } from "@/client/data/deeplink/repository/deeplink-repository-impl";
import { ResolveDeepLinkUseCase } from "@/client/domain/deeplink/usecase/resolve-deeplink-use-case";

export function registerClientDependencies(container: Container): void {
  // Quran Data Source & Repository
  const quranDataSource = new QuranRemoteDataSourceImpl();
  const quranRepository = new QuranRepositoryImpl(quranDataSource);

  container.bind({
    provide: TOKENS.QuranRemoteDataSource,
    useValue: quranDataSource,
  });
  container.bind({
    provide: TOKENS.QuranRepository,
    useValue: quranRepository,
  });
  container.bind({
    provide: TOKENS.GetQuranSurahListUseCase,
    useValue: new GetQuranSurahListUseCase(quranRepository),
  });
  container.bind({
    provide: TOKENS.GetQuranSurahDetailUseCase,
    useValue: new GetQuranSurahDetailUseCase(quranRepository),
  });
  container.bind({
    provide: TOKENS.GetQuranAyahUseCase,
    useValue: new GetQuranAyahUseCase(quranRepository),
  });

  // Doa Data Source & Repository
  const doaDataSource = new DoaRemoteDataSourceImpl();
  const doaRepository = new DoaRepositoryImpl(doaDataSource);

  container.bind({
    provide: TOKENS.DoaRemoteDataSource,
    useValue: doaDataSource,
  });
  container.bind({
    provide: TOKENS.DoaRepository,
    useValue: doaRepository,
  });
  container.bind({
    provide: TOKENS.GetDoaListUseCase,
    useValue: new GetDoaListUseCase(doaRepository),
  });
  container.bind({
    provide: TOKENS.GetDoaDetailUseCase,
    useValue: new GetDoaDetailUseCase(doaRepository),
  });

  // DeepLink Data Source & Repository
  const deepLinkDataSource = new DeepLinkRemoteDataSourceImpl();
  const deepLinkRepository = new DeepLinkRepositoryImpl(deepLinkDataSource);

  container.bind({
    provide: TOKENS.DeepLinkRemoteDataSource,
    useValue: deepLinkDataSource,
  });
  container.bind({
    provide: TOKENS.DeepLinkRepository,
    useValue: deepLinkRepository,
  });
  container.bind({
    provide: TOKENS.ResolveDeepLinkUseCase,
    useValue: new ResolveDeepLinkUseCase(deepLinkRepository),
  });
}
