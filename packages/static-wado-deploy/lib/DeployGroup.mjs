import fs from "fs";
import { configGroup } from "@ohif/static-wado-util";
import path from "path";
import { handleHomeRelative } from "@ohif/static-wado-util";
import S3Ops from "@ohif/static-wado-s3/lib/s3Ops.mjs";

/**
 * Deployment class.
 * Knows how to configure/load the deploy operations and then use them to 
 * create/store deployments.
 * 
 * Note, the buckets MUST already be configured in order to setup the deployment.
 * Copies things from the source file to the destination file.
 */

class DeployGroup {

  constructor(config, groupName) {
    this.config = config;
    this.groupName = groupName;
    this.group = configGroup(config,groupName)
    this.baseDir = handleHomeRelative(this.group.dir);
  }

  get ops() {
    return this._ops || (this._ops = new S3Ops(this.config,this.groupName));
  }

  /**
   * Stores the entire directory inside basePath / subdir.
   * asynchronous function
   * @params basePath is the part of the path name outside the sub-directory name.
   * @params {string[]} files is a list of base file locations to start with 
   * @params subdir is the sub directory within basePath that is included in the path name for upload.
  */
  async store(parentDir="", name = "") {
    const fileName = path.join(this.baseDir,parentDir,name);
    // console.log('Doing lstat', fileName);
    const lstat = await fs.promises.lstat(fileName);
    const relativeName = name && `${parentDir}/${name}` || parentDir || "";
    console.log('relativeName', relativeName);
    if( lstat.isDirectory() ) {
      console.log("Reading directory", fileName);
      const names = await fs.promises.readdir(fileName);
      await Promise.all(names.map(name => this.store(relativeName, name)));
      return;
    }
    await this.ops.upload(this.baseDir, relativeName, null, lstat.size)
  }
}

export default DeployGroup;