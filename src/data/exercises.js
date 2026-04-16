export const muscleGroups = [
  { id: 'chest', name: '胸部', icon: '💪' },
  { id: 'back', name: '背部', icon: '🔙' },
  { id: 'shoulders', name: '肩膀', icon: '🏋️' },
  { id: 'biceps', name: '二頭肌', icon: '💪' },
  { id: 'triceps', name: '三頭肌', icon: '💪' },
  { id: 'legs', name: '腿部', icon: '🦵' },
  { id: 'abs', name: '腹部', icon: '🎯' },
  { id: 'glutes', name: '臀部', icon: '🍑' },
  { id: 'compound', name: '複合動作', icon: '⚡' },
  { id: 'stretch', name: '伸展恢復', icon: '🧘' },
]

export const exercises = [
  // 胸部
  { id: 1,  name: '槓鈴臥推',       englishName: 'barbell bench press',             muscle: 'chest',     equipment: '槓鈴',   difficulty: '中等', description: '躺在臥推椅上，雙手握住槓鈴，將槓鈴從胸部推起至手臂伸直，再慢慢放下。', tips: '保持背部微拱，雙腳踩穩地面。下放時手肘約45度角。' },
  { id: 2,  name: '啞鈴飛鳥',       englishName: 'dumbbell fly',                    muscle: 'chest',     equipment: '啞鈴',   difficulty: '中等', description: '躺在臥推椅上，雙手各持啞鈴，手臂微彎，向兩側打開再合攏。', tips: '動作全程保持手肘微彎，感受胸肌的伸展與收縮。' },
  { id: 3,  name: '伏地挺身',       englishName: 'push up',                         muscle: 'chest',     equipment: '徒手',   difficulty: '簡單', description: '雙手撐地，身體保持一直線，彎曲手肘將身體下降，再推起。', tips: '核心收緊，不要塌腰或翹臀。' },
  { id: 4,  name: '上斜啞鈴臥推',   englishName: 'incline dumbbell press',          muscle: 'chest',     equipment: '啞鈴',   difficulty: '中等', description: '在上斜椅上進行啞鈴臥推，針對上胸發力。', tips: '椅子角度約30-45度，不要聳肩。' },
  { id: 5,  name: '雙槓撐體',       englishName: 'dips',                            muscle: 'chest',     equipment: '雙槓',   difficulty: '困難', description: '雙手撐在雙槓上，身體前傾，彎曲手肘下降再推起。', tips: '身體前傾約30度可以更好地刺激胸肌。' },

  // 背部
  { id: 6,  name: '引體向上',       englishName: 'pull up',                         muscle: 'back',      equipment: '單槓',   difficulty: '困難', description: '雙手握住單槓，將身體往上拉至下巴超過槓的高度。', tips: '避免利用慣性擺盪，專注背部發力。' },
  { id: 7,  name: '槓鈴划船',       englishName: 'bent over barbell row',           muscle: 'back',      equipment: '槓鈴',   difficulty: '中等', description: '身體前傾約45度，將槓鈴從下方拉至腹部位置。', tips: '保持背部平直，避免圓背。' },
  { id: 8,  name: '滑輪下拉',       englishName: 'cable lat pulldown',              muscle: 'back',      equipment: '器械',   difficulty: '簡單', description: '坐在滑輪機前，將握把從上方拉至胸前。', tips: '挺胸，將手肘向下拉而非向後拉。' },
  { id: 9,  name: '單臂啞鈴划船',   englishName: 'dumbbell bent over row',          muscle: 'back',      equipment: '啞鈴',   difficulty: '中等', description: '一手一腳撐在椅子上，另一手將啞鈴從下方拉至腰側。', tips: '拉到最高點時擠壓背部肌肉。' },

  // 肩膀
  { id: 10, name: '啞鈴肩推',       englishName: 'dumbbell shoulder press',         muscle: 'shoulders', equipment: '啞鈴',   difficulty: '中等', description: '坐姿或站姿，將啞鈴從肩膀高度推至頭頂。', tips: '核心收緊，避免過度拱腰。' },
  { id: 11, name: '啞鈴側平舉',     englishName: 'dumbbell lateral raise',          muscle: 'shoulders', equipment: '啞鈴',   difficulty: '簡單', description: '雙手各持啞鈴，向兩側抬起至與肩同高。', tips: '小拇指微微朝上，像倒水一樣。' },
  { id: 12, name: '啞鈴前平舉',     englishName: 'dumbbell front raise',            muscle: 'shoulders', equipment: '啞鈴',   difficulty: '簡單', description: '雙手各持啞鈴，向前方抬起至與肩同高。', tips: '控制速度，不要甩動。' },

  // 二頭肌
  { id: 13, name: '啞鈴彎舉',       englishName: 'dumbbell bicep curl',             muscle: 'biceps',    equipment: '啞鈴',   difficulty: '簡單', description: '站立姿勢，將啞鈴從大腿前方彎舉至肩膀。', tips: '上臂固定不動，只用前臂發力。' },
  { id: 14, name: '槓鈴彎舉',       englishName: 'barbell curl',                    muscle: 'biceps',    equipment: '槓鈴',   difficulty: '中等', description: '雙手握住槓鈴，從大腿前方彎舉至肩膀。', tips: '不要利用身體擺盪借力。' },
  { id: 15, name: '錘式彎舉',       englishName: 'hammer curl',                     muscle: 'biceps',    equipment: '啞鈴',   difficulty: '簡單', description: '啞鈴掌心相對，從大腿側面彎舉至肩膀。', tips: '可以鍛鍊到肱橈肌和二頭肌長頭。' },

  // 三頭肌
  { id: 16, name: '三頭肌下壓',     englishName: 'tricep pushdown',                 muscle: 'triceps',   equipment: '器械',   difficulty: '簡單', description: '在滑輪機上將握把從胸前下壓至大腿前方。', tips: '上臂固定在身體兩側。' },
  { id: 17, name: '法式彎舉',       englishName: 'skull crusher',                   muscle: 'triceps',   equipment: '啞鈴',   difficulty: '中等', description: '躺在椅上或站立，將啞鈴從頭頂後方舉至頭頂上方。', tips: '手肘朝向天花板，固定不動。' },

  // 腿部
  { id: 18, name: '槓鈴深蹲',       englishName: 'barbell squat',                   muscle: 'legs',      equipment: '槓鈴',   difficulty: '困難', description: '將槓鈴放在上背，下蹲至大腿與地面平行，再站起。', tips: '膝蓋方向與腳尖一致，不要內夾。' },
  { id: 19, name: '腿推機',         englishName: 'leg press',                       muscle: 'legs',      equipment: '器械',   difficulty: '中等', description: '坐在腿推機上，將重量從彎曲位置推至腿部伸直。', tips: '不要完全鎖死膝蓋。' },
  { id: 20, name: '弓箭步',         englishName: 'lunge',                           muscle: 'legs',      equipment: '徒手',   difficulty: '中等', description: '一腳向前跨出，下蹲至前腿彎曲90度，再回到起始位置。', tips: '保持上半身直立，核心收緊。' },
  { id: 21, name: '羅馬尼亞硬舉',   englishName: 'romanian deadlift',               muscle: 'legs',      equipment: '槓鈴',   difficulty: '中等', description: '微彎膝蓋，將槓鈴沿著腿部下放，感受腿後側伸展。', tips: '背部保持平直，臀部向後推。' },
  { id: 22, name: '腿彎舉',         englishName: 'leg curl',                        muscle: 'legs',      equipment: '器械',   difficulty: '簡單', description: '趴在腿彎舉機上，將腳跟向臀部方向彎曲。', tips: '控制離心階段，慢慢放下。' },

  // 腹部
  { id: 23, name: '捲腹',           englishName: 'crunch',                          muscle: 'abs',       equipment: '徒手',   difficulty: '簡單', description: '躺在地上，雙手放在耳旁，用腹肌力量將上背捲起。', tips: '不要拉脖子，專注用腹部發力。' },
  { id: 24, name: '棒式',           englishName: 'plank',                           muscle: 'abs',       equipment: '徒手',   difficulty: '簡單', description: '手肘撐地，身體保持一直線，維持姿勢。', tips: '臀部不要過高或過低。' },
  { id: 25, name: '懸垂抬腿',       englishName: 'hanging leg raise',               muscle: 'abs',       equipment: '單槓',   difficulty: '困難', description: '懸掛在單槓上，將雙腿抬至與地面平行。', tips: '避免利用擺盪，控制動作速度。' },

  // 臀部
  { id: 26, name: '臀推',           englishName: 'barbell hip thrust',              muscle: 'glutes',    equipment: '槓鈴',   difficulty: '中等', description: '上背靠在椅子上，將槓鈴放在髖部，向上推起臀部。', tips: '在最高點擠壓臀部肌肉，停頓一秒。' },
  { id: 27, name: '保加利亞分腿蹲', englishName: 'bulgarian split squat',           muscle: 'glutes',    equipment: '啞鈴',   difficulty: '困難', description: '後腳放在椅子上，前腳下蹲至大腿與地面平行。', tips: '重心放在前腳，身體微微前傾。' },

  // 複合動作
  { id: 28, name: '槓鈴硬舉',       englishName: 'deadlift',                        muscle: 'compound',  equipment: '槓鈴',   difficulty: '困難', description: '雙腳與肩同寬，彎腰抓住槓鈴，保持背部平直，用臀腿力量將槓鈴從地面拉起至站直。', tips: '全程保持脊椎中立，槓鈴貼近身體，不要用下背弓起。' },
  { id: 29, name: '過頭推舉',       englishName: 'overhead press',                  muscle: 'compound',  equipment: '槓鈴',   difficulty: '困難', description: '站姿，將槓鈴從鎖骨高度推至頭頂上方，手臂完全伸直。', tips: '收緊核心與臀部，不要過度拱腰，眼睛直視前方。' },
  { id: 30, name: '爆發上搏',       englishName: 'power clean',                     muscle: 'compound',  equipment: '槓鈴',   difficulty: '困難', description: '從地面爆發性地將槓鈴拉至肩膀高度，快速下蹲接住槓鈴。', tips: '需要先熟練硬舉動作，爆發力動作需要教練指導。' },
  { id: 31, name: '前蹲舉',         englishName: 'front squat',                     muscle: 'compound',  equipment: '槓鈴',   difficulty: '困難', description: '槓鈴放在鎖骨前方，手肘朝前高舉，執行深蹲動作。', tips: '手肘保持高位，上半身更直立，核心全程收緊。' },
  { id: 32, name: '直立划船',       englishName: 'barbell upright row',             muscle: 'compound',  equipment: '槓鈴',   difficulty: '中等', description: '雙手握住槓鈴，沿著身體前側垂直拉至下巴高度。', tips: '手肘高於手腕，不要拉超過下巴，保護肩關節。' },
  { id: 33, name: '農夫走路',       englishName: 'farmers walk',                    muscle: 'compound',  equipment: '啞鈴',   difficulty: '中等', description: '雙手各持重物，保持身體直立，穩定地行走一段距離。', tips: '肩膀下壓不聳肩，核心收緊，步伐穩定。' },
  { id: 34, name: '酒杯式深蹲',     englishName: 'goblet squat',                    muscle: 'compound',  equipment: '啞鈴',   difficulty: '簡單', description: '雙手握住一個啞鈴放在胸前，執行深蹲，適合初學者。', tips: '手肘朝下，利用啞鈴重量幫助身體保持直立。' },
  { id: 35, name: '壺鈴擺盪',       englishName: 'kettlebell swing',                muscle: 'compound',  equipment: '壺鈴',   difficulty: '中等', description: '雙手抓住壺鈴，用臀部爆發力將壺鈴從胯下擺至肩膀高度。', tips: '動力來自臀部爆發而非手臂拉，保持背部平直。' },
  { id: 36, name: '六角槓硬舉',     englishName: 'trap bar deadlift',               muscle: 'compound',  equipment: '六角槓', difficulty: '中等', description: '站在六角槓中間，抓住兩側把手，保持背部平直將重量拉起。', tips: '比傳統硬舉更對膝蓋友善，適合初學者練習硬舉。' },

  // 伸展/恢復動作
  { id: 37, name: '貓牛式',         englishName: 'cat cow stretch',                 muscle: 'stretch',   equipment: '徒手',   difficulty: '簡單', description: '四足跪姿，交替進行背部向上拱起（貓式）和向下沉降（牛式）的動作。', tips: '配合呼吸，吸氣時牛式，吐氣時貓式，動作緩慢。' },
  { id: 38, name: '鴿子式',         englishName: 'pigeon pose',                     muscle: 'stretch',   equipment: '徒手',   difficulty: '中等', description: '將一腳彎曲在身前，另一腳向後伸直，身體前傾下壓伸展髖部。', tips: '保持骨盆水平，不要讓身體歪斜。' },
  { id: 39, name: '世界最偉大伸展', englishName: 'world greatest stretch',          muscle: 'stretch',   equipment: '徒手',   difficulty: '中等', description: '弓箭步姿勢，前腳旁手撐地，後腳腿拉直，同時旋轉上半身向上伸展。', tips: '動作連貫，全身同時伸展到髖屈肌、胸椎和腿後側。' },
  { id: 40, name: '胸椎旋轉',       englishName: 'thoracic rotation stretch',       muscle: 'stretch',   equipment: '徒手',   difficulty: '簡單', description: '側臥，上方膝蓋彎曲靠在泡棉滾筒上，慢慢旋轉上半身向後打開。', tips: '腰椎固定不動，只讓胸椎旋轉，感受胸口打開。' },
  { id: 41, name: '髖屈肌伸展',     englishName: 'hip flexor stretch',              muscle: 'stretch',   equipment: '徒手',   difficulty: '簡單', description: '單腳跪地弓箭步，後腳膝蓋著地，身體直立向前推，伸展後腳髖屈肌。', tips: '保持骨盆後傾，避免腰部過度前凸。' },
  { id: 42, name: '腿後側伸展',     englishName: 'hamstring stretch',               muscle: 'stretch',   equipment: '徒手',   difficulty: '簡單', description: '坐在地上，一腳伸直，另一腳彎曲，身體向伸直腿方向前傾。', tips: '背部保持平直，從臀部向前折而不是彎腰。' },
  { id: 43, name: '肩膀前側伸展',   englishName: 'shoulder stretch',                muscle: 'stretch',   equipment: '徒手',   difficulty: '簡單', description: '站立，一手向後伸展，抓住固定物或對側手肘，將肩膀向前轉動伸展。', tips: '轉動肩膀而非只拉手臂，感受胸肌和肩前側的伸展。' },
  { id: 44, name: '泡棉滾筒放鬆',   englishName: 'foam rolling',                    muscle: 'stretch',   equipment: '泡棉滾筒', difficulty: '簡單', description: '將目標肌群放在泡棉滾筒上，利用身體重量緩慢滾動按壓。', tips: '在痠痛點停留10-30秒，配合深呼吸幫助放鬆。' },
]

export const defaultWorkoutPlans = [
  {
    id: 'plan-1',
    name: '新手全身訓練 A',
    description: '適合剛開始健身的初學者，每週2-3次',
    exercises: [
      { exerciseId: 1, sets: 3, reps: 10, rest: 90 },
      { exerciseId: 7, sets: 3, reps: 10, rest: 90 },
      { exerciseId: 10, sets: 3, reps: 10, rest: 60 },
      { exerciseId: 18, sets: 3, reps: 10, rest: 120 },
      { exerciseId: 23, sets: 3, reps: 15, rest: 60 },
    ],
  },
  {
    id: 'plan-2',
    name: '新手全身訓練 B',
    description: '搭配訓練A交替進行',
    exercises: [
      { exerciseId: 3, sets: 3, reps: 12, rest: 60 },
      { exerciseId: 8, sets: 3, reps: 10, rest: 90 },
      { exerciseId: 13, sets: 3, reps: 12, rest: 60 },
      { exerciseId: 20, sets: 3, reps: 10, rest: 90 },
      { exerciseId: 24, sets: 3, reps: 30, rest: 60 },
    ],
  },
  {
    id: 'plan-3',
    name: '胸背超級組',
    description: '中級訓練者的胸背組合訓練',
    exercises: [
      { exerciseId: 1, sets: 4, reps: 8, rest: 90 },
      { exerciseId: 6, sets: 4, reps: 8, rest: 90 },
      { exerciseId: 2, sets: 3, reps: 12, rest: 60 },
      { exerciseId: 9, sets: 3, reps: 12, rest: 60 },
      { exerciseId: 5, sets: 3, reps: 10, rest: 90 },
    ],
  },
  {
    id: 'plan-4',
    name: '腿部訓練日',
    description: '完整的腿部訓練課表',
    exercises: [
      { exerciseId: 18, sets: 4, reps: 8, rest: 120 },
      { exerciseId: 19, sets: 3, reps: 12, rest: 90 },
      { exerciseId: 21, sets: 3, reps: 10, rest: 90 },
      { exerciseId: 22, sets: 3, reps: 12, rest: 60 },
      { exerciseId: 26, sets: 3, reps: 12, rest: 60 },
    ],
  },
]
