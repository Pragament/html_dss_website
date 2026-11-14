require "jekyll"
require "tmpdir"
require "fileutils"
require "yaml"
require "cgi"

ROOT = File.expand_path("..", __dir__)

def check(condition, message)
  raise message unless condition
end

def render(source, destination, baseurl = "")
  config = Jekyll.configuration(
    "source" => source, "destination" => destination,
    "config" => File.join(source, "_config.yml"),
    "baseurl" => baseurl, "quiet" => true
  )
  Jekyll::Site.new(config).process
  File.read(File.join(destination, "gallery.html"), encoding: "UTF-8")
end

cms = YAML.load_file(File.join(ROOT, ".pages.yml"))
check(cms["content"].first["path"] == "_gallery", "CMS must edit the gallery collection")
entries = Dir[File.join(ROOT, "_gallery", "*.md")].map do |path|
  data = YAML.safe_load(File.read(path, encoding: "UTF-8").split(/^---[ \t]*$/)[1])
  %w[title kind media alt].each do |field|
    check(data[field].is_a?(String) && !data[field].empty?, "#{path}: missing #{field}")
  end
  check(%w[image video].include?(data["kind"]), "#{path}: invalid media type")
  check(data["order"].is_a?(Numeric), "#{path}: order must be numeric")
  check([true, false].include?(data["visible"]), "#{path}: visible must be boolean")
  check(!data.key?("featured") || [true, false].include?(data["featured"]), "#{path}: featured must be boolean")
  check(File.file?(File.join(ROOT, data["media"].sub(%r{^/}, ""))), "#{path}: missing media")
  data
end

Dir.mktmpdir("dss-gallery-test") do |dir|
  source = File.join(dir, "source")
  destination = File.join(dir, "site")
  FileUtils.mkdir_p(source)
  %w[_config.yml gallery.html index.html _gallery].each do |path|
    FileUtils.cp_r(File.join(ROOT, path), source)
  end
  html = render(source, destination)
  expected = entries.reject { |item| item["visible"] == false }.sort_by { |item| item["order"] }
  media = html.scan(/<(?:img|source)\s+src="([^"]+)"/).flatten.select { |path| path.start_with?("/assets/images/gallery/") }
  check(media == expected.map { |item| CGI.escapeHTML(item["media"]) }, "Gallery media or order changed")
  check(!html.include?("{%") && html.start_with?("<!DOCTYPE html>"), "Unrendered template")

  homepage = File.read(File.join(destination, "index.html"), encoding: "UTF-8")
  featured = entries.select { |item| item["featured"] == true && item["kind"] == "image" }.sort_by { |item| item["order"] }
  banner = homepage.split('<!-- Admissions Hero Start -->')[1].split('<!-- Admissions Hero End -->')[0]
  check(banner.scan(/<img src="([^"]+)"/).flatten == featured.map { |item| CGI.escapeHTML(item["media"]) }, "Featured homepage images do not match collection")
  check(!homepage.include?("{%") && homepage.start_with?("<!DOCTYPE html>"), "Unrendered homepage template")

  # Exercise CMS-created content without changing the real collection.
  Dir[File.join(source, "_gallery", "*.md")].each { |path| File.delete(path) }
  write_item = lambda do |filename, fields, caption|
    File.write(File.join(source, "_gallery", filename), fields.to_yaml + "---\n" + caption)
  end
  fields = { "title" => 'A "quoted" title', "alt" => 'Students & "friends"',
             "kind" => "image", "media" => "/assets/images/gallery/example.jpg",
             "order" => 20, "visible" => true, "featured" => true }
  write_item.call("photo.md", fields, "A **bold** caption.\n")
  write_item.call("video.md", fields.merge("kind" => "video", "media" => "/assets/images/gallery/example.mp4", "order" => 10), "")
  write_item.call("hidden.md", fields.merge("media" => "/assets/images/gallery/hidden.jpg", "visible" => false, "order" => 5), "Hidden caption")
  write_item.call("ordinary.md", fields.merge("media" => "/assets/images/gallery/ordinary.jpg", "featured" => false), "")
  html = render(source, destination, "/school")
  check(html.index("example.mp4") < html.index("example.jpg"), "Numeric ordering failed")
  check(html.include?('src="/school/assets/images/gallery/example.jpg"'), "Project-site media URL failed")
  check(html.include?('alt="Students &amp; &quot;friends&quot;"'), "Accessible description must be escaped")
  check(html.include?('class="image-popup"'), "Photo lightbox hook missing")
  check(html.include?('controls preload="metadata"'), "Video controls missing")
  check(html.include?("<strong>bold</strong>"), "Markdown caption failed")
  check(!html.include?("hidden.jpg") && !html.include?("Hidden caption"), "Hidden item rendered")
  check(html.scan("<figcaption").size == 1, "Blank captions should not render")

  homepage = File.read(File.join(destination, "index.html"), encoding: "UTF-8")
  banner = homepage.split('<!-- Admissions Hero Start -->')[1].split('<!-- Admissions Hero End -->')[0]
  check(banner.scan(/<img src="([^"]+)"/).flatten == ["/school/assets/images/gallery/hidden.jpg", "/school/assets/images/gallery/example.jpg"], "Featured selection, independent visibility, or ordering failed")
  check(banner.scan('aria-roledescription="slide"').size == 2 && banner.include?("data-banner-next"), "Multi-slide controls missing")
  check(banner.include?('alt="Students &amp; &quot;friends&quot;"'), "Banner alt text must be escaped")
  File.delete(File.join(source, "_gallery", "hidden.md"))
  render(source, destination)
  homepage = File.read(File.join(destination, "index.html"), encoding: "UTF-8")
  check(!homepage.include?("data-banner-next"), "Single image must not show carousel controls")

  Dir[File.join(source, "_gallery", "*.md")].each { |path| File.delete(path) }
  html = render(source, destination)
  check(html.include?("New gallery photos and videos are coming soon."), "Empty state missing")
  check(!html.include?("example.jpg"), "Deleted item remains in gallery")
  homepage = File.read(File.join(destination, "index.html"), encoding: "UTF-8")
  check(!homepage.include?('class="dss-banner-slide"'), "Empty featured collection renders slides")
  check(homepage.include?("<h1>Delhi Secondary School, Sangareddy</h1>"), "School heading must remain without featured media")
end

puts "Gallery checks passed: content, media, ordering, visibility, captions, escaping, video, base URL, deletion, and empty state."
