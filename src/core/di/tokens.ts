import { InjectionToken } from "@needle-di/core";
import { QuranRemoteDataSource } from "@/client/data/quran/data_source/quran-remote-data-source";
import { QuranRepository } from "@/client/domain/quran/repository/quran-repository";
import { GetQuranSurahListUseCase } from "@/client/domain/quran/usecase/get-quran-surah-list-use-case";
import { GetQuranSurahDetailUseCase } from "@/client/domain/quran/usecase/get-quran-surah-detail-use-case";
import { GetQuranAyahUseCase } from "@/client/domain/quran/usecase/get-quran-ayah-use-case";

import { DoaRemoteDataSource } from "@/client/data/doa/data_source/doa-remote-data-source";
import { DoaRepository } from "@/client/domain/doa/repository/doa-repository";
import { GetDoaListUseCase } from "@/client/domain/doa/usecase/get-doa-list-use-case";
import { GetDoaDetailUseCase } from "@/client/domain/doa/usecase/get-doa-detail-use-case";

import { DeepLinkRemoteDataSource } from "@/client/data/deeplink/data_source/deeplink-remote-data-source";
import { DeepLinkRepository } from "@/client/domain/deeplink/repository/deeplink-repository";
import { ResolveDeepLinkUseCase } from "@/client/domain/deeplink/usecase/resolve-deeplink-use-case";

export const TOKENS = {
  // Quran
  QuranRemoteDataSource: new InjectionToken<QuranRemoteDataSource>("QuranRemoteDataSource"),
  QuranRepository: new InjectionToken<QuranRepository>("QuranRepository"),
  GetQuranSurahListUseCase: new InjectionToken<GetQuranSurahListUseCase>("GetQuranSurahListUseCase"),
  GetQuranSurahDetailUseCase: new InjectionToken<GetQuranSurahDetailUseCase>("GetQuranSurahDetailUseCase"),
  GetQuranAyahUseCase: new InjectionToken<GetQuranAyahUseCase>("GetQuranAyahUseCase"),

  // Doa
  DoaRemoteDataSource: new InjectionToken<DoaRemoteDataSource>("DoaRemoteDataSource"),
  DoaRepository: new InjectionToken<DoaRepository>("DoaRepository"),
  GetDoaListUseCase: new InjectionToken<GetDoaListUseCase>("GetDoaListUseCase"),
  GetDoaDetailUseCase: new InjectionToken<GetDoaDetailUseCase>("GetDoaDetailUseCase"),

  // DeepLink
  DeepLinkRemoteDataSource: new InjectionToken<DeepLinkRemoteDataSource>("DeepLinkRemoteDataSource"),
  DeepLinkRepository: new InjectionToken<DeepLinkRepository>("DeepLinkRepository"),
  ResolveDeepLinkUseCase: new InjectionToken<ResolveDeepLinkUseCase>("ResolveDeepLinkUseCase"),
} as const;
