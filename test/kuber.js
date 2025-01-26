import * as k8s from '@kubernetes/client-node';
import assert from 'node:assert';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod({namespace: 'default'}).then((res) => {
  assert.equal(res.items.length, 1);

  const {metadata, status} = res.items[0];
  
  assert.equal(metadata.labels.app, 'server');
  assert.equal(metadata.namespace, 'default');
  assert.equal(status.phase, 'Running');
});
