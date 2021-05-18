# Microservice | Docker | Kubernets - MINIMAL EXAMPLE

This is a very minimal example on how to use kubernets with dockerized microservices.
As a minimal example it shows very basics of how to implement a kind of CQRS and event sourcing pattern.
To run this application, kubernetes and kubectrl must be installed on machine. (Minikube in this case).

### Follow the steps below to run the application

The easiest way to run this project is using [skaffold](https://skaffold.dev/) to automatically gets all services running.

command: `skaffold dev`

Another way is to build all the project mannually as follows:

1. Build all docker files of the apps:

comand: `docker build -t <your-repo>/<app-name>`

example:

```bash
docker build --no-cache -t johndoe/posts
```

2. Push the images to the repository

command: `docker push <your-repo>/<app-name>`

example:

```bash
docker push johndoe/posts
```

3. Add ingress-controller to map routes and create a loadbalancer

[nginx-ingress-controller](https://kubernetes.github.io/ingress-nginx/)

4. apply all kubernetes services

command: `kubectl apply -f .`

OBS.:

- In the case of this minimal example, once the ingress-controller is configured to use kubeposts.com, the hosts file must be configured as follow: **127.0.0.1 posts.com** (using minikube the minikube ip must configured instead. command: `minikube ip`)

- If any change is made in the code and minikube is beeing used, the docker images of the application changed must be removed, all the kubernetes deployments, services, pods and ingress must be deleted and then rebuild, push images and apply kubernetes configs.

- In case of changing any application and not using minikube, just build the image again, push to dockerhub and rollout restart kubernet deployment

---

#### Usefull commands

```
kubectl get pods|services|deployments
kubectl delete [--all] pods [pod-name]
kubectl delete [--all] deployments [depl-name]
kubectl apply -f [.|filename]
kubectl rollout restart deployment [depl-name]
skaffold dev
```

Problems with minikube: if any problem occours, delete all local images, deployments, services, pods, then restart minikube and then recriate everything
