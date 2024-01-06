import type { FormKitNode } from "@formkit/core"

export const max_sum = (node: FormKitNode, max = 20) => {
  return Object.values(node.value).reduce((a, b) => a + b) <= max
}
