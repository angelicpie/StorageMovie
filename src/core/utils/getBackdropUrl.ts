import * as core from '@/core';

const IMAGE_PLACEHOLDER = (core as any).IMAGE_PLACEHOLDER ?? '';
const ORIGINAL_IMAGE_BASE_URL = (core as any).ORIGINAL_IMAGE_BASE_URL ?? '';

export const getBackdropUrl = (fileName: string) => (fileName ? `${ORIGINAL_IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER);