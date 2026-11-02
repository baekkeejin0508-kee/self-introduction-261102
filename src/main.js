import './style.css'

/**
 * 1. 스크롤에 따라 콘텐츠가 부드럽게 나타나는 효과 (IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal')

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -40px 0px',
    }
  )

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 3) * 80}ms`
    observer.observe(el)
  })
}

/**
 * 2. 카드 위에 마우스를 올렸을 때 네온 조명(Spotlight)이 따라오는 인터랙션
 */
function initInteractiveCards() {
  const cards = document.querySelectorAll('.interactive-card')

  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  })
}

/**
 * 3. 모바일 메뉴 토글 및 네비게이션 스크롤 활성화 표시
 */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn')
  const siteNav = document.getElementById('siteNav')
  const navLinks = document.querySelectorAll('.nav-link')
  const sections = document.querySelectorAll('main section[id]')

  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open')
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen))
    })

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open')
        mobileMenuBtn.setAttribute('aria-expanded', 'false')
      })
    })
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id')
            navLinks.forEach((link) => {
              const isMatch = link.getAttribute('href') === `#${currentId}`
              link.classList.toggle('active', isMatch)
            })
          }
        })
      },
      {
        rootMargin: '-35% 0px -55% 0px',
      }
    )

    sections.forEach((section) => sectionObserver.observe(section))
  }
}

/**
 * 4. 연락처 이메일 주소 복사 기능
 */
function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn')
  const feedbackEl = document.getElementById('copyFeedback')

  if (!copyBtn || !feedbackEl) return

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || 'yktk100@sen.go.kr'

    try {
      await navigator.clipboard.writeText(email)
      feedbackEl.textContent = `✓ 이메일 주소(${email})가 클립보드에 복사되었습니다.`
    } catch {
      feedbackEl.textContent = `이메일 주소: ${email}`
    }

    window.setTimeout(() => {
      feedbackEl.textContent = ''
    }, 3500)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal()
  initInteractiveCards()
  initNavigation()
  initEmailCopy()
})
