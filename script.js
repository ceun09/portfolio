document.write('<script src="script/inputGalleryData.js"></script>');

window.addEventListener('load', () => {
    mainAnchor();   // 스크롤 애니메이션
    copyMarquee();  // Marquee 항목 복사
    activeTap();    // 탭 메뉴
    customCursor(); // 커스텀 마우스
    modeChange();   // 다크 모드 버튼
    activeGnb();    // 모바일 GNB 메뉴
    activeVisual();
    activeGallery(); // 갤러리 애니메이션
    activeFeature();
})

window.addEventListener('scroll', () => {
    hideTopButton();    // 탑 버튼
})

if (document.getElementsByClassName('gnbMain') !== null) {
    const gnbNav = document.getElementsByClassName('gnbMain');
    gnbNav.scrollLeft += 200;
}

// 스크롤 애니메이션
function mainAnchor() {
    let slideSet;
    let winH;
    let idx = 0;
    let lastScrollY = 0;

    let header = document.querySelector('.gnbMain');

    init();
    slidingPage();

    function init() {
        slideSet = document.querySelectorAll('.sc-max');
        winH = window.innerHeight;
    }

    window.addEventListener('scroll', () => {
        slidingPage();
    })

    function slidingPage() {
        const scrollTop = window.scrollTop || window.pageYOffset;
        let scrollY = window.scrollY;

        for (var i = 0; i < slideSet.length; i++) {
            var posFromTop = slideSet[i].getBoundingClientRect().top;

            // Check the scroll direction
            let scrollDown = scrollY < lastScrollY;
            const checkScroll = scrollDown ? upNow() : downNow();

            // console.log(slideSet[i])
            // console.log(winH - posFromTop)
            // console.log(posFromTop - winH)

            // 스크롤 올렸을 때
            function upNow() {
                if (winH - posFromTop < 100 && i <= 2) {
                    // 헤더 클래스명 삭제
                    header.classList.remove('color');
                } else if (winH - posFromTop < 110) {
                    // 섹션 클래스명 삭제
                    slideSet[i].classList.remove('active');
                }
            }

            // 스크롤 내렸을 때
            function downNow() {
                if (posFromTop - winH > 0 && i > 0) {
                    // 헤더 클래스명 추가
                    header.classList.add('color');
                } else if (winH - posFromTop > 100) {
                    // 섹션 클래스명 삭제
                    slideSet[i].classList.add('active')
                } else if (winH - posFromTop < 1000) {
                    return;
                }
            }
        }
        lastScrollY = scrollY;
    }

    // Resizing the window size
    window.addEventListener('resize', init());

    init();
}

// 다크 모드 버튼
function modeChange() {
    const button = document.querySelector('.btn_mode');
    const mode = button.querySelectorAll('.md');
    const dot = button.querySelector('.toggle-dot');

    button.addEventListener('click', ()=> {
        // on 켜졌을 때 다크 모드
        button.classList.toggle('on');
        document.body.classList.toggle('dark-mode');
    })
}

// 모바일 gnb 메뉴
function activeGnb() {
    const openBtn = document.querySelector('.toggle-btn');
    const closeBtn = document.querySelector('.close-btn');
    const mobileMenu = document.querySelector('.flex-menu');
    const menuBtns = document.querySelectorAll('.flex-menu .link');

    openBtn.addEventListener('click', ()=> {
        mobileMenu.classList.add('active');
    })

    closeBtn.addEventListener('click', ()=> {
        mobileMenu.classList.remove('active');
    })

    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        })
    })
}

// 탭 메뉴
function activeTap() {
    const buttons = document.querySelectorAll('.feat-tabs .box');
    const contentArea = document.querySelector('.feat-cont');
    const contents = contentArea.querySelectorAll('.cont-area');

    let pageY = window.scrollY || window.pageYOffset;
    let contentHeight = contentArea.getBoundingClientRect().top;
    let absoluteContentHeight = pageY + contentHeight;  // tab content 절대 위치
    let correctionFactor;   // 스크롤 보정 값 (해당 크기만큼 제외하여 이동)

    responsiveCheck = (e) => {
        // 반응형 체크 -> 스크롤 보정 값 조정
        if(window.matchMedia("screen and (min-width: 1441px)")) {
            correctionFactor = 80;
        } else if(window.matchMedia("screen and (max-width: 1025px)")) {
            correctionFactor = 50;
        } else if(window.matchMedia("screen and (max-width: 768px)")) {
            correctionFactor = 80;
        }
    }

    responsiveCheck(correctionFactor);

    buttons.forEach((button, index)=> {
        button.addEventListener('click', (e)=> {
            buttons.forEach((button) => {
                button.classList.remove('on');
            })
            e.target.classList.add('on');

            contents.forEach((content) => {
                console.log(content)
                // contentHeightCalc(content);
                content.classList.remove('on');
            })
            contents[index].classList.add('on');
            window.scrollTo(0, absoluteContentHeight - correctionFactor);
        })
    })

    function contentHeightCalc(this) {
        let height = this.getBoundingClientRect();
        console.log(this);
        console.log(height);

        contentArea.style.height = h + 'px';
    }
}

// 탑 버튼
function hideTopButton() {
    let topBtn = document.querySelector('.topBtn');
    let footerHeight;

    init();

    if(window.scrollY > 0) {
        topBtn.classList.remove('hide');
    } else {
        topBtn.classList.add('hide');
    }

    // 창 크기 달라지면 푸터 크기 재측정
    window.addEventListener('resize', init());

    // 푸터 크기 측정
    function init() {
        footerHeight = 0;
    }
}

// 마우스 애니메이션
function mouseEffect() {
    let myItems = document.querySelectorAll();
    let curItem;

    myItems.forEach((number, index) => {
        // 마우스 커서가 올라갔을 때
        myItems[index].addEventListener('mouseenter', (e) => {
            curItem = e.target;
            initList();
        })
        // 마우스 커서가 떠났을 때
        myItems[index].addEventListener('mouseleave', () => {
            curItem = false;
            initList();
        })
    })

    // Default 값
    function initList() {
        myItems.forEach((number, index) => {
            myItems[index].classList.remove('active');
            if (curItem) {
                myItems[index].classList.add('unactivated');
            } else {
                myItems[index].classList.remove('unactivated');
            }
        })
        if (curItem) {
            curItem.classList.remove('unactivated');
            curItem.classList.add('active');
        }
    }
}

// Marquee 항목 복사
function copyMarquee() {
    let marqBox = document.querySelector('.marq-box');
    let newNode = marqBox.firstElementChild.cloneNode(true);

    marqBox.appendChild(newNode);
}

// 커스텀 마우스
function customCursor() {
    const myCursor = document.querySelector('.cursor-wrap'); 
    const items = document.querySelectorAll('.mainPortfolio .gallery-wrap .item');

    window.addEventListener('mousemove', cursor);
    window.addEventListener('scroll', cursor);
    window.addEventListener('wheel', cursor)

    items.forEach((item) => {
        item.addEventListener('mouseover', ()=> {
            document.body.classList.add('mouse-change');
            myCursor.classList.add('active');
        })
        item.addEventListener('mouseleave', ()=> {
            document.body.classList.remove('mouse-change');
            myCursor.classList.remove('active');
        })
    })

    function cursor(e) {
        myCursor.style.left = e.pageX + "px";
        myCursor.style.top = e.pageY + "px";
    }
}

// Modal
let isModalOpen = false;

// 모달 페이지 연결
function includeModal(e) {
    isModalOpen = true;
    const modal = document.querySelector('.modal-wrap');
    const modalContent = modal.querySelector('.modal-content');
    let item = e.parentNode;

    // 닫기 버튼
    const closeBtn = modal.querySelector('.modal-close-btn');

    // 모달 바깥 영역에서서 스크롤 방지지
    document.body.style.overflow = 'hidden';

    let address = item.getAttribute('data-address');
    
    modal.classList.remove('fade');
    modalContent.setAttribute('data-include', address);

    // data-address 값이 있는 경우만 Modal 출력
    if(address) {
        const includeArea = document.querySelectorAll('[data-include]');

        // 모달 내부에 외부 파일 출력
        for(let dom of includeArea) {
            const url = dom.dataset.include;

            fetch(url)
            .then(Response => Response.text())
            .then(data => {
                dom.innerHTML = data;
                dom.removeAttribute('data-include');
            })
        }
    }

    // ESC 키 눌렀을 때
    window.addEventListener('keydown', (e)=> {
        if(e.keycode == 27 || e.which == 27) {
            closeModal();
        }
    })

    // 닫기 버튼 눌렀을 때
    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    function handleClickOutside(e) {
        const modalBox = document.querySelector('.modal-dialog');
        if(isModalOpen && !modalBox.contains(e.target)) {
            // closeModal();
        }
    }
    document.addEventListener('click', handleClickOutside);
}

// Modal 창 닫기
function closeModal() {
    isModalOpen = false;
    document.querySelector('.modal-wrap').classList.add('fade');
    
    // 모달 바깥 영역의 스크롤 방지 해제
    document.body.style.overflow = 'auto';
}

// Modal Top 버튼 구현
function modalScroll() {
    const modal = document.querySelector('.modal-dialog');
    modal.scrollTop = 0;
}

function activeVisual() {
    const items = document.querySelectorAll('.mainVisual .el');
    let delay = 0.1;

    setDelay(items, delay);
}

// 갤러리 애니메이션
function activeGallery() {
    const items = document.querySelectorAll('.gallery-wrap .item');
    let delay = 0.13;

    setDelay(items, delay);    
}

//  
function activeFeature() {
    const items = document.querySelectorAll('.mainFeature .tab-menu .box');
    let delay = 0.22;

    setDelay(items, delay);
}

// 애니메이션 딜레이
function setDelay(items, delay) {
    items.forEach((item, index) => {
        item.classList.add('check');
        items[index].setAttribute('style', 'animation-delay: ' + index * delay + 's');
    })
}