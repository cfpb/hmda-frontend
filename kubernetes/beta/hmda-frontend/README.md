Installation on Kubernetes Cluster using helm

```
git clone https://github.com/cfpb/hmda-frontend
cd hmda-frontend /
helm upgrade --install \
--values=kubernetes/beta/hmda-frontend/values.yaml \
--set image.tag=latest \
hmda-frontend-beta \
kubernetes/beta/hmda-frontend -n beta
```
