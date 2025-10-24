Installation on Kubernetes Cluster using helm

```
git clone https://github.com/cfpb/hmda-frontend
cd hmda-frontend /
helm upgrade --install \
--values=kubernetes/hmda-frontend/values.yaml \
--set image.tag=latest \
--set ambassador_id=example_ambassador_id \ # only set if needed
--set ambassador_host=example.com \ # only set if needed
hmda-frontend \
kubernetes/hmda-frontend
```
