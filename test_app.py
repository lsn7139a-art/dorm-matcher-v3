from playwright.sync_api import sync_playwright
import time, os

SCREENSHOT_DIR = r"d:\程序\宿舍trae\dorm-matcher-v3\test_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def screenshot(page, name):
    path = os.path.join(SCREENSHOT_DIR, f"{name}.png")
    page.screenshot(path=path, full_page=True)
    print(f"[OK] Screenshot saved: {path}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})

    # 1. 首页
    print("\n=== Step 1: 首页 ===")
    page.goto("http://localhost:3000/")
    page.wait_for_load_state("networkidle")
    screenshot(page, "01_homepage")
    print(f"Page title: {page.title()}")

    # 2. 进入问卷页面
    print("\n=== Step 2: 进入问卷 ===")
    start_btn = page.locator("button:has-text('开始'), button:has-text('填写'), a:has-text('开始'), a:has-text('填写'), button:has-text('问卷')")
    if start_btn.count() > 0:
        start_btn.first.click()
    else:
        page.goto("http://localhost:3000/survey")
    page.wait_for_load_state("networkidle")
    time.sleep(1)
    screenshot(page, "02_survey_entry")

    # 3. 输入名字
    print("\n=== Step 3: 输入名字 ===")
    name_input = page.locator("input[type='text'], input[placeholder*='名字'], input[placeholder*='姓名']")
    if name_input.count() > 0:
        name_input.first.fill("测试用户小张")
        time.sleep(0.5)
        screenshot(page, "03_name_input")

        confirm_btn = page.locator("button:has-text('确认'), button:has-text('开始'), button:has-text('下一步'), button:has-text('提交')")
        if confirm_btn.count() > 0:
            confirm_btn.first.click()
            time.sleep(1)
            page.wait_for_load_state("networkidle")
            screenshot(page, "04_after_name")

    # 4. 填写问卷 - 逐题选择选项
    print("\n=== Step 4: 填写问卷 ===")
    question_count = 0
    max_questions = 40

    for i in range(max_questions):
        time.sleep(0.5)

        options = page.locator(".option-btn, .option-card, [class*='option'], button[class*='option']")
        if options.count() == 0:
            radio_options = page.locator("input[type='radio']")
            if radio_options.count() > 0:
                radio_options.first.click()
            else:
                custom_options = page.locator("label, [role='button'], [class*='choice']")
                if custom_options.count() > 0:
                    custom_options.first.click()
                else:
                    print(f"  No options found at step {i}, might be done or need different selector")
                    break

        if options.count() > 0:
            mid = options.count() // 3
            if mid >= options.count():
                mid = 0
            options.nth(mid).click()
            question_count += 1

            if question_count % 5 == 0:
                screenshot(page, f"05_survey_q{question_count}")
                print(f"  Answered {question_count} questions")

        next_btn = page.locator("button:has-text('下一题'), button:has-text('下一步'), button:has-text('继续')")
        if next_btn.count() > 0:
            next_btn.first.click()
            continue

        page.wait_for_timeout(500)

    screenshot(page, f"05_survey_done_q{question_count}")
    print(f"  Total questions answered: {question_count}")

    # 5. 提交问卷
    print("\n=== Step 5: 提交问卷 ===")
    submit_btn = page.locator("button:has-text('提交'), button:has-text('完成'), button:has-text('查看结果')")
    if submit_btn.count() > 0:
        submit_btn.first.click()
        time.sleep(2)
        page.wait_for_load_state("networkidle")
        screenshot(page, "06_after_submit")

    # 6. 查看匹配结果
    print("\n=== Step 6: 匹配结果 ===")
    page.goto("http://localhost:3000/match")
    page.wait_for_load_state("networkidle")
    time.sleep(2)
    screenshot(page, "07_match_page")

    # 查看宿舍卡片
    dorm_cards = page.locator("[class*='dorm-card'], [class*='dorm-summary']")
    print(f"  Found {dorm_cards.count()} dorm cards")

    if dorm_cards.count() > 0:
        dorm_cards.first.click()
        time.sleep(1)
        screenshot(page, "08_dorm_expanded")

    # 查看成员详情
    member_cards = page.locator("[class*='member-card'], [class*='member-header']")
    if member_cards.count() > 0:
        member_cards.first.click()
        time.sleep(1)
        screenshot(page, "09_member_detail")

    # 7. 检查桥接信息
    print("\n=== Step 7: 桥接信息 ===")
    bridge_tags = page.locator("[class*='bridge'], [class*='compromise']")
    print(f"  Found {bridge_tags.count()} bridge/compromise elements")

    # 8. 检查偏好选择
    print("\n=== Step 8: 偏好选择 ===")
    prefer_btns = page.locator("[class*='prefer-btn']")
    print(f"  Found {prefer_btns.count()} prefer buttons")

    if prefer_btns.count() > 0:
        prefer_btns.first.click()
        time.sleep(1)
        screenshot(page, "10_prefer_selected")

    # 9. 切换到真实用户标签
    print("\n=== Step 9: 真实用户标签 ===")
    real_tab = page.locator("button:has-text('真实用户')")
    if real_tab.count() > 0:
        real_tab.first.click()
        time.sleep(1)
        screenshot(page, "11_real_users_tab")

    print("\n=== Test Complete ===")
    print(f"Screenshots saved to: {SCREENSHOT_DIR}")

    browser.close()
