module.exports = {
  name: `plugin-project`,
  factory: require => {
    const { Manifest } = require(`@yarnpkg/core`);
    const { BaseCommand } = require(`@yarnpkg/cli`);

    class ProjectCommand extends BaseCommand {
      static paths = [[`project`]];

      async execute() {
        const { raw: { name, version, author, description, dependencies } } = await Manifest.find(this.context.cwd);
        const formattedDependencies =
          Object.entries(dependencies).map(([name, version]) => `${name}: ${version}`);
        this.context.stdout.write(
          JSON.stringify({ name, version, author, description, dependencies: formattedDependencies })
        );
      }
    }

    return {
      commands: [
        ProjectCommand
      ]
    };
  }
};