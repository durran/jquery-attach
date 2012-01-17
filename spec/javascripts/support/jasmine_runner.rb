require "jasmine"
require "rspec"

config_overrides = File.expand_path(File.join(File.dirname(__FILE__), "jasmine_config.rb"))
require config_overrides if File.exist?(config_overrides)

spec_builder = Jasmine::SpecBuilder.new(Jasmine::Config.new)

Rspec::Runner.configure do |config|
  config.after(:suite) do
    spec_builder.stop
  end
end

spec_builder.start
spec_builder.declare_suites
