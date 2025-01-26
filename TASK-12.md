# Deploy

Напишите Gitlab CI скрипт который загружает ассеты на s3 и деплоит докер образ.

Для загрузки на S3 воспользуйтесь aws-cli, для docker обычный docker tag / push.

При деплое на s3 используйте путь `s3://infra-homework/<USERNAME>`.

Для деплоя docker используйте тот же `<USERNAME>` для имени образа `<USERNAME>:1.0.0`.

На s3 задеплойте dist после `npm run build`, для docker используйте образ из 10 лекции.

Для проверки используйте `npm run test:deploy <USERNAME>`

## Доступы

Для S3 вам понадобятся два токена (добавьте их в variables своего форка в gitlab ci).

Secret access key id: `YCAJE4GQAJ8RC3DCWj6OPb1o1`

Secret access key: `YCPMBtP-CfWiE0kbniE4dqg2V0lK13QvLIgNb_Fn`

Для докера понадобится OAUTH токен, он доступен глобально в gitlab ci как `$DOCKER_OAUTH_TOKEN`.

## Подсказки

Адрес s3: `https://storage.yandexcloud.net`

S3 cli image: `amazon/aws-cli:2.20.0` (обязательно укажите версию, более новые несовместимы с s3 yandex)

Docker registry: `cr.yandex/crp268b2vecu7qdlejus`

[Docker auth](https://yandex.cloud/ru/docs/container-registry/operations/authentication?from=int-console-help-center-or-nav#user)

Для запуска сборки docker в CI нужно использовать Docker in Docker (DinD), для этого нужно для джобы указать следующие опции:

```
image: docker:24.0.5
services:
  - docker:24.0.5-dind
variables:
  DOCKER_HOST: tcp://docker:2376
  DOCKER_TLS_CERTDIR: "/certs"
  DOCKER_TLS_VERIFY: 1
  DOCKER_CERT_PATH: "$DOCKER_TLS_CERTDIR/client"
```
