
'use strict'

import fs from 'fs';
import path from 'path';
import Logger from '../log';
import component from 'stampit'

const log = Logger();
const isProduction = process.env.NODE_ENV === 'production'
let assetsManifest = {}

if (isProduction) {
  try {
    const data = fs.readFileSync('../../public/assets/rev-manifest.json')
    assetsManifest = JSON.parse(data)
  } catch (e) {
    log.error(e);
    log.warn(`An error occured while reading the asset manifest`)
  }
}

const AssetsTag = component()
  .init(function() {

    this.tags = ['assets'];

    this.parse = function(parser, nodes, lexer) {
      const tok = parser.nextToken()
      const args = parser.parseSignature(null, true)
      parser.advanceAfterBlockEnd(tok.value)
      return new nodes.CallExtension(this, 'run', args)
    }

    this.run = function(context, file) {
      let assetPath;

      if (isProduction && file in assetsManifest) {
        assetPath = assetsManifest[file]
      } else {
        assetPath = file
      }

       return assetPath
    };
  });

  export function install(env) {
    env.addExtension('AssetsTag', AssetsTag.create());
  }
