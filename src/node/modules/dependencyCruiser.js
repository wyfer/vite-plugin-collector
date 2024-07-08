const dependencyCruiserName = 'dependency-cruiser';

const cruiseJson = async (config, server, option) => {

  try {
    const dc = await import(dependencyCruiserName);

    const {
      dir, maxDepth, depth, tsPreCompilationDeps, outputType, exclude, alias
    } = option;

    const analysis = dc.cruise([dir], {
      exclude: {
        path: exclude,
      },
      maxDepth,
      depth,
      tsPreCompilationDeps,
      outputType,
    }, {
      alias: alias
    })

    if (!analysis?.output) {
      return {}
    }

    return JSON.parse(analysis.output);
  } catch (e) {
    console.log(e);
    return {
      modules: [],
      summary: {

      }
    }
  }
}

export const getCruiseJson = async (config, server, option) => {
  return await cruiseJson(config, server, option);
}


