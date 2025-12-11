---
name: Performance Incident
about: Report performance issues to automatically generate a BookStack article
title: "[Performance Incident] "
labels: incident, performance
body:
  - type: textarea
    id: description
    attributes:
      label: "Описание инцидента"
      description: "Опишите что произошло, когда и какие сервисы затронуты"
  - type: textarea
    id: steps
    attributes:
      label: "Шаги воспроизведения"
      description: "Как воспроизвести проблему"
  - type: textarea
    id: observed
    attributes:
      label: "Наблюдаемые симптомы"
      description: "Что зафиксировано в процессе расследования"
  - type: textarea
    id: suspected
    attributes:
      label: "Предполагаемая причина"
      description: "Возможные причины"
  - type: textarea
    id: solution
    attributes:
      label: "Решение / действия"
      description: "Что сделано или предлагается сделать"
---
