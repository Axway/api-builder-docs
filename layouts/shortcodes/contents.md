{{ range .Page.Pages }}
* [{{ .Title }}]({{ .Permalink }}){{ range .Pages }}
  * [{{ .Title }}]({{ .Permalink }}){{ end }}{{ end }}