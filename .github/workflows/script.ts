import { Octokit } from '@octokit/rest';
import type * as core from '@actions/core'
import type * as github from '@actions/github'

type Args = {
  context: typeof github.context
  core: typeof core
  branch: string
  token: string
}

const main = async ({ context, core, branch, token }: Args) => {
  // target が適切なブランチであることを検証すべき
  const newOctkit = new Octokit({ auth: token });

  try {
    await newOctkit.rest.git.deleteRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `heads/${branch}`
    });

    console.log(`${branch} を削除した`)
  } catch (e) {
    console.error(`${branch} の削除に失敗した: ${e.message}`)
    core.setFailed(e.message)
  }
}

export { main }
