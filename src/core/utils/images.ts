import * as core from '@/core';

const IMAGE_BASE_URL = (core as any).IMAGE_BASE_URL ?? '';
const ORIGINAL_IMAGE_BASE_URL = (core as any).ORIGINAL_IMAGE_BASE_URL ?? '';

export const getBackdropUrl = (fileName: string) => `${ORIGINAL_IMAGE_BASE_URL}${fileName}`;

export const getImageUrl = (fileName: string) => `${IMAGE_BASE_URL}${fileName}`;

