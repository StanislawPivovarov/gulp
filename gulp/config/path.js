//получаем имя папки проекта

import * as nodePath form 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

//папка с результатом создается автоматически
const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    files: ${buildFolder}
  },
  src: {
    files: ${srcFolder}/*.*
  },
  watch: {},
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp:''
}
