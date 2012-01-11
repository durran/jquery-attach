require "jasmine"
require "rspec"
require "rspec/core/rake_task"
load "jasmine/tasks/jasmine.rake"

RSpec::Core::RakeTask.new(:jasmine_ci) do |t|
  t.rspec_opts = ["--colour", "--format", "progress"]
  t.verbose = true
  t.pattern = ["spec/javascript/support/jasmine_runner.rb"]
end

namespace :jasmine do
  desc "Run continuous integration tests"
  task :specs => ["jasmine:require_json", "jasmine_ci"]
end
