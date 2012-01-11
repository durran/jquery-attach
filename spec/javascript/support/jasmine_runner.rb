require "jasmine"
require "rspec"

config_overrides = File.expand_path(File.join(File.dirname(__FILE__), "jasmine_config.rb"))
require jasmine_config_overrides if File.exist?(config_overrides)

spec_builder = Jasmine::SpecBuilder.new(Jasmine::Config.new)

should_stop = false

Spec::Runner.configure do |config|
  config.after(:suite) do
    spec_builder.stop if should_stop
  end
end

spec_builder.start
should_stop = true
spec_builder.declare_suites
