declare const  BaseHrefRuntimeVitePlugin  = (options: BaseVitePluginOptions) => any;

interface BaseVitePluginOptions {
    fallbackBaseHref?: string;
    publicPaths?: string[];
}

export default BaseHrefRuntimeVitePlugin