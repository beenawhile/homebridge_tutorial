### Home Bridge Guide

1. homebridge?
    - 애플의 smart home solution인 Homekit과 애플의 기준에 맞지 않은 smart home appliance 들을 연결해 주는 다리 역할의 nodejs plugin
    - 그런 smart home devices들은 앱을 지원하던데? => 앱을 일일이 깔아야 함 => 사용자 경험 저해!
    - Homekit과 연동할 수 있으면, iOS, macOS, watchOS, ipadOS 와 iCloud와 연결할 수 있는 장비(=Homepod, Homepod mini) 모두에서 제어를 할 수 있게 됨 => 사용 연속성을 주어 좋은 사용자 경험을 줄 수 있음

2. 가이드 라인
    - (필수) 반드시 파일 구조를 다음과 같이 만들 것
        |- index.js : homebridge 기본 세팅 및 로직 
        |- package.json : homebridge가 plugin 정보를 만들 때 참고하는 정보
        |- etc...
    - homebridge plugin 되는 조건 (package.json 참고)
        1) name 을 "homebridge-..."로 설정해야 함
        2) keyword 를 "homebridge-plugin"로 설정해야 함
    - plugin에 악세서리 등록 + homekit config에 등록
        - 다음 커맨드를 기호에 맞게 설정할 것
        ₩₩₩
        "accessories": [
            {
                "name": "TV Volume",
                "accessory": "SensMan Volume"
            },
            {
                "name": "Radio Volume",
                "accessory": "SensMan Volume",
                "defaultVolume": 90
            }
        ]
        ₩₩₩

3. command
    - sudo npm link : 내 컴퓨터에 있는 로컬 모듈 불러오기 => 작성한 node 모듈을 homebridge에 적용하기 위해 필요한 명령
    - 
