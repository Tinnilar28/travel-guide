// DOM（HTMLの構造）が完全に読み込まれてからスクリプトを実行します
document.addEventListener('DOMContentLoaded', () => {

    // --- コンテンツデータ ---
    // この locationData の部分を編集するだけで、観光地の情報を修正・追加できます。
    const locationData = [
        {
            id: 'yangon',
            name: 'ヤンゴン (Yangon)',
            content: {
                hits: {
                    title: 'ヒット (Hits)',
                    points: [
                        '黄金に輝くシェダゴン・パゴダは必見。特に夕暮れ時は圧巻です。',
                        '植民地時代の面影が残るダウンタウンの建築物群を散策。',
                        '活気あふれるボージョーアウンサン・マーケットでショッピング。',
                        '円形鉄道に乗って、地元の人の生活を垣間見る。'
                    ]
                },
                advice: {
                    title: 'アドバイス (Advice)',
                    points: [
                        'パゴダに入る際は、靴と靴下を脱ぎ、肩や膝を覆う服装が必要です。ロンジー（巻きスカート）のレンタルもあります。',
                        '移動には配車アプリ「Grab」が便利で安心です。',
                        'ダウンタウンの歩道は整備されていない場所が多いので、歩きやすい靴を選びましょう。',
                        '地元のティーショップでミルクティー「ラペイエ」を試してみてください。'
                    ]
                },
                warnings: {
                    title: '注意点 (Warnings)',
                    points: [
                        '交通渋滞が激しいので、移動時間は余裕を持って計画しましょう。',
                        '夜間の一人歩き、特に暗い路地は避けてください。',
                        '水道水は飲めません。必ずミネラルウォーターを飲みましょう。',
                        '高額な宝石などを勧められても、安易に信用しないようにしましょう。'
                    ]
                }
            }
        },
        {
            id: 'bagan',
            name: 'バガン (Bagan)',
            content: {
                hits: {
                    title: 'ヒット (Hits)',
                    points: [
                        '数千の仏塔や寺院が広がる絶景。特に朝日と夕日は感動的です。',
                        '熱気球に乗って、上空から遺跡群を眺める（シーズン限定）。',
                        'E-Bike（電動バイク）をレンタルして、自分のペースで遺跡巡り。',
                        '漆器工房を訪れて、伝統工芸品作りの工程を見学する。'
                    ]
                },
                advice: {
                    title: 'アドバイス (Advice)',
                    points: [
                        '日差しが非常に強いので、帽子、サングラス、日焼け止めは必須です。',
                        'E-Bikeのバッテリー切れに注意。出発前にフル充電されているか確認しましょう。',
                        '多くの寺院で靴を脱ぐ必要があるため、脱ぎ履きしやすいサンダルが便利です。',
                        'オフシーズン（雨季）は観光客が少なく、緑豊かなバガンを楽しめます。'
                    ]
                },
                warnings: {
                    title: '注意点 (Warnings)',
                    points: [
                        '遺跡保護のため、指定された場所以外の仏塔に登ることは禁止されています。',
                        'E-Bikeの運転には注意が必要です。砂地の道も多いので、安全運転を心がけてください。',
                        '物売りの子供たちから物を買わないようにしましょう。学校へ行くことを奨励するためです。',
                        '遺跡内でドローンを飛ばすには許可が必要です。'
                    ]
                }
            },
        },
        {
            id: 'inle',
            name: 'インレー湖 (Inle Lake)',
            content: {
                hits: {
                    title: 'ヒット (Hits)',
                    points: [
                        '片足で巧みに舟を漕ぐインダー族の漁師たちの姿。',
                        '湖上に建てられた水上集落や、水上菜園のユニークな風景。',
                        'ガーペー僧院（猫のジャンプで有名だった）や、ファウンドーウー・パゴダをボートで巡る。',
                        '5日に一度開かれる水上マーケットで、地元の産物や人々と触れ合う。'
                    ]
                },
                advice: {
                    title: 'アドバイス (Advice)',
                    points: [
                        'ボートでの移動中は日差しと風を直接受けるので、上着やスカーフがあると便利です。',
                        'ボートツアーは事前に料金や立ち寄る場所をしっかり交渉・確認しましょう。',
                        'インレー湖周辺のニャウンシュエの町には、多くのホテルやレストランがあります。',
                        '地元の織物工房（蓮の糸の織物など）は一見の価値ありです。'
                    ]
                },
                warnings: {
                    title: '注意点 (Warnings)',
                    points: [
                        '観光客向けの工房や土産物店に多く立ち寄るツアーもあります。希望しない場合は事前に伝えましょう。',
                        'モーターボートのエンジン音が大きいことがあります。',
                        '乾季（11月～2月）の朝晩は冷え込むことがあるので、暖かい服装も用意しましょう。',
                        '一部のレストランでは衛生状態に注意が必要です。信頼できるお店を選びましょう。'
                    ]
                }
            }
        }
    ];

    // --- ここから下はスクリプトのロジック部分です ---

    const navContainer = document.getElementById('location-nav');
    const infoContainer = document.getElementById('info-display');

    // 1. データからナビゲーションボタンを生成する
    locationData.forEach(location => {
        const button = document.createElement('button');
        button.textContent = location.name;
        button.dataset.id = location.id; // ボタンにIDを紐付ける
        navContainer.appendChild(button);
    });

    // 2. 観光地情報を表示するための関数
    const displayLocationInfo = (locationId) => {
        // IDをもとに、locationDataから該当するデータを探す
        const location = locationData.find(loc => loc.id === locationId);
        if (!location) {
            infoContainer.innerHTML = '<p>場所を選択してください。</p>';
            return;
        }

        const { hits, advice, warnings } = location.content;

        // HTMLを組み立てて、情報表示エリアに挿入する
        infoContainer.innerHTML = `
            <h2 class="location-title">${location.name}</h2>

            <div class="info-card hits">
                <h3><i class="fa-solid fa-star"></i> ${hits.title}</h3>
                <ul>
                    ${hits.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>

            <div class="info-card advice">
                <h3><i class="fa-solid fa-lightbulb"></i> ${advice.title}</h3>
                <ul>
                    ${advice.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>

            <div class="info-card warnings">
                <h3><i class="fa-solid fa-triangle-exclamation"></i> ${warnings.title}</h3>
                <ul>
                    ${warnings.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
        `;
    };

    // 3. ナビゲーション全体にクリックイベントを設定（イベント移譲）
    navContainer.addEventListener('click', (e) => {
        // クリックされたのがボタン要素の場合のみ処理を実行
        if (e.target.tagName === 'BUTTON') {
            // いったん全てのボタンから 'active' クラスを削除する
            navContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            // クリックされたボタンにだけ 'active' クラスを追加する
            e.target.classList.add('active');
            
            // ボタンに紐付けられたIDを取得
            const locationId = e.target.dataset.id;
            // そのIDの情報を表示する
            displayLocationInfo(locationId);
        }
    });

    // 4. ページ読み込み時に、デフォルトで最初の観光地の情報を表示する
    if (locationData.length > 0) {
        navContainer.querySelector('button').classList.add('active');
        displayLocationInfo(locationData[0].id);
    }
});