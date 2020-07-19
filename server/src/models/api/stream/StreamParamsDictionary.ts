import * as core from "express-serve-static-core";

export interface StreamParamsDictionary extends core.ParamsDictionary {
    streamId: string;
}