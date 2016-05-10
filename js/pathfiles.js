function getExtensionOfFilename(pFilename) {
  var re = /(?:\.([^.]+))?$/;
  // re.exec("/path.file/project/output.dzslides.html")[1];  returns  "html"
  return re.exec(pFilename)[1];   // "html"
}
function removeExtension(pFilename) {
  return pFilename.substr(0, pFilename.lastIndexOf('.'));
}
function getPathFromFilename(pFilename) {
  return pFilename.substr(0, pFilename.lastIndexOf('/'));
}
function getProjectDir(pProject) {
  var vProject = "";
  if (pProject) {
    vProject = "/"+pProject;
  };
  return (document.getElementById("projectmainDIR").value+vProject);
}
/**
 * Souce: https://gist.github.com/eriwen/1211656
 * Given a source directory and a target filename, return the relative
 * file path from source to target.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path (e.g. "../../style.css") as {String}
 */
function getRelativePath(source, target) {
	var sep = (source.indexOf("/") !== -1) ? "/" : "\\",
		targetArr = target.split(sep),
		sourceArr = source.split(sep),
		filename = targetArr.pop(),
		targetPath = targetArr.join(sep),
		relativePath = "";

	while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
		sourceArr.pop();
		relativePath += ".." + sep;
	}

	var relPathArr = targetArr.slice(sourceArr.length);
	relPathArr.length && (relativePath += relPathArr.join(sep) + sep);

	return relativePath + filename;
}
