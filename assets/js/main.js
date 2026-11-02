/**
 * PORTFOLIO RAKHMAT HIDAYAT - JAVASCRIPT INTERACTIONS & YOUTUBE PLAYER
 * Informatics Engineer | Public Relations | Digital Creative
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE NAVIGATION
       ========================================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.querySelector('header.site-header');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });

        // Close menu when clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            }
        });
    }

    // Header scroll background tint
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    /* ==========================================================================
       2. INTERACTIVE 3D "TIMBUL" AVATAR TILT EFFECT
       ========================================================================== */
    const avatar3dCard = document.querySelector('.avatar-3d-card');
    const avatar3dContainer = document.querySelector('.avatar-3d-container');

    if (avatar3dContainer && avatar3dCard) {
        avatar3dContainer.addEventListener('mousemove', (e) => {
            const rect = avatar3dContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            avatar3dCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        avatar3dContainer.addEventListener('mouseleave', () => {
            avatar3dCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    }

    /* ==========================================================================
       3. YOUTUBE HELPER FUNCTIONS
       ========================================================================== */
    function extractYouTubeId(url) {
        if (!url) return null;
        const cleanUrl = url.trim();

        // 11 characters ID regex
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = cleanUrl.match(regExp);

        if (match && match[2].length === 11) {
            return match[2];
        }

        // Direct 11-char ID
        if (cleanUrl.length === 11 && !cleanUrl.includes('/')) {
            return cleanUrl;
        }

        return null;
    }

    /* ==========================================================================
       4. PORTFOLIO FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length && portfolioCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetCategory = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (targetCategory === 'all' || cardCategory === targetCategory) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    /* ==========================================================================
       5. PROJECT LIGHTBOX MODAL WITH YOUTUBE EMBED PLAYER
       ========================================================================== */
    const modalOverlay = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalImg = document.getElementById('modalImg');
    const modalImageHolder = document.getElementById('modalImageHolder');
    const modalVideoHolder = document.getElementById('modalVideoHolder');
    const modalIframe = document.getElementById('modalIframe');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalVideoLinkWrap = document.getElementById('modalVideoLinkWrap');

    if (modalOverlay) {
        portfolioCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title') || card.querySelector('h3')?.textContent || 'Project';
                const desc = card.getAttribute('data-desc') || card.querySelector('p')?.textContent || '';
                const category = card.getAttribute('data-badge') || 'Proyek';
                const imgSrc = card.querySelector('img')?.src || '';
                const tags = card.getAttribute('data-tags') || '';
                const youtubeUrl = card.getAttribute('data-youtube') || '';

                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) modalDesc.textContent = desc;
                if (modalBadge) modalBadge.textContent = category;

                const youtubeId = extractYouTubeId(youtubeUrl);

                // Handle YouTube embed vs static image
                if (youtubeId && modalVideoHolder && modalIframe) {
                    if (modalImageHolder) modalImageHolder.style.display = 'none';
                    modalVideoHolder.style.display = 'block';
                    modalIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

                    if (modalVideoLinkWrap) {
                        modalVideoLinkWrap.innerHTML = `
                            <a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                                <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24" style="color:#ef4444;"><path fill="currentColor" stroke="none" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                Buka di YouTube ↗
                            </a>
                        `;
                    }
                } else {
                    if (modalVideoHolder) modalVideoHolder.style.display = 'none';
                    if (modalIframe) modalIframe.src = '';
                    if (modalImageHolder) modalImageHolder.style.display = 'block';
                    if (modalImg) modalImg.src = imgSrc;
                    if (modalVideoLinkWrap) modalVideoLinkWrap.innerHTML = '';
                }

                if (modalTags) {
                    modalTags.innerHTML = '';
                    if (tags) {
                        tags.split(',').forEach(tag => {
                            const span = document.createElement('span');
                            span.className = 'meta-pill';
                            span.textContent = tag.trim();
                            modalTags.appendChild(span);
                        });
                    }
                }

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Stop YouTube video playback on close
            if (modalIframe) {
                modalIframe.src = '';
            }
        };

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    /* ==========================================================================
       6. CV PREVIEW MODAL
       ========================================================================== */
    const cvModal = document.getElementById('cvModal');
    const cvModalClose = document.getElementById('cvModalClose');
    const cvModalTitle = document.getElementById('cvModalTitle');
    const cvModalContent = document.getElementById('cvModalContent');
    const cvDownloadBtn = document.getElementById('cvModalDownload');
    const previewCvButtons = document.querySelectorAll('.btn-preview-cv');

    const cvData = {
        ats: {
            title: 'Curriculum Vitae (Format ATS-Friendly)',
            downloadUrl: 'assets/cv/CV_ATS_Rakhmat_Hidayat.pdf',
            fileName: 'CV_ATS_Rakhmat_Hidayat.pdf',
            html: `
                <div style="font-size:13.5px; line-height:1.75; color:#334155;">
                    <div style="border-bottom:2px solid #059669; padding-bottom:12px; margin-bottom:16px;">
                        <h2 style="font-size:20px; color:#0f172a; margin-bottom:4px;">RAKHMAT HIDAYAT, S.Kom</h2>
                        <p style="font-weight:600; color:#059669;">Sarjana Komputer | Staff Event Organizer | Public Relations | Digital Creative</p>
                        <p style="font-size:12px; color:#64748b;">Alamat: Desa Sojomerto RT.02/RW.01 Kec. Reban, Kab. Batang | Telp/WA: +62 8574-2976-911 | Email: hidayatrakhmat38@gmail.com</p>
                    </div>

                    <h4 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#059669; margin:16px 0 6px;">Deskripsi Saya</h4>
                    <p>Lulusan Sarjana Komputer (S.Kom) dengan minat dan kompetensi di bidang Teknologi Informasi, pengembangan sistem, desain grafis, dan pemanfaatan media digital. Memiliki pengalaman organisasi serta kemampuan dalam pengelolaan website, media informasi, dan analisis data. Dikenal sebagai pribadi yang disiplin, bertanggung jawab, mudah beradaptasi, serta mampu bekerja secara individu maupun dalam tim.</p>

                    <h4 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#059669; margin:16px 0 6px;">Pendidikan</h4>
                    <p><strong>Universitas PGRI Semarang</strong> — S1 Teknik Informatika (2022 – 2026)<br>
                    <strong>SMK Muhammadiyah Bawang</strong> — Teknik Komputer dan Jaringan (TKJ) (2019 – 2022)<br>
                    <strong>SMP Negeri 1 Limpung</strong> (2016 – 2019)<br>
                    <strong>SDN 01 Sojomerto</strong> (2010 – 2016)</p>

                    <h4 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#059669; margin:16px 0 6px;">Pengalaman Kerja & Kegiatan</h4>
                    <p><strong>Staff Event Organizer (2025):</strong> Perencanaan, koordinasi lapangan, manajemen logistik, dan alur teknis acara.<br>
                    <strong>Admin Media Informatika UPGRIS (2024 – 2025):</strong> Pengelolaan publikasi media digital, desain grafis, dan dokumentasi.<br>
                    <strong>Ketua Bidang Infokom (2023 – 2024):</strong> Memimpin dan mengoordinasikan bidang Infokom dan komunikasi organisasi.<br>
                    <strong>Staf Bidang Infokom – Himpunan Mahasiswa Informatika (2022 – 2023):</strong> Pengelolaan informasi dan publikasi.<br>
                    <strong>PT Mitra Aplikasi Teknologi:</strong> Magang Industri Software Tester / Quality Control (QC).</p>

                    <h4 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#059669; margin:16px 0 6px;">Sertifikasi & Keterampilan</h4>
                    <p><strong>Sertifikasi:</strong> Sertifikat Magang Industri PT Mitra Aplikasi Teknologi (QC), Sertifikat OJT YALIDA, Sertifikat Pemateri Project Infest Terbaik.<br>
                    <strong>Fisik:</strong> Tinggi 174 cm, Berat 57 kg, Sehat Jasmani dan Rohani.</p>
                </div>
            `
        },
        creative: {
            title: 'Curriculum Vitae (Format Visual & Kreatif)',
            downloadUrl: 'assets/cv/CV_Kreatif_Rakhmat_Hidayat.pdf',
            fileName: 'CV_Kreatif_Rakhmat_Hidayat.pdf',
            html: `
                <div style="font-size:13.5px; line-height:1.75; color:#334155;">
                    <div style="background:linear-gradient(135deg, #064e3b 0%, #047857 100%); color:white; padding:20px; border-radius:14px; margin-bottom:18px;">
                        <h2 style="font-size:22px; color:white; margin-bottom:4px;">RAKHMAT HIDAYAT, S.Kom</h2>
                        <p style="color:#a7f3d0; font-weight:700;">Informatics Engineer, Staff Event Organizer, & Digital Creative</p>
                        <p style="font-size:12px; color:#e2e8f0; margin-top:8px;">“Bagi saya, setiap perjalanan, pekerjaan, dan pengalaman adalah sebuah kanvas kosong yang dapat diisi dengan ide, dedikasi, dan inovasi.”</p>
                    </div>

                    <h4 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#059669; margin:16px 0 6px;">Pengalaman Unggulan</h4>
                    <ul style="padding-left:18px; margin-bottom:14px;">
                        <li><strong>Staff Event Organizer (2025):</strong> Eksekusi lapangan, koordinasi teknis, logistik, dan alur acara profesional.</li>
                        <li><strong>Admin Media Informatika UPGRIS (2024 – 2025):</strong> Desain publikasi, Instagram growth, dan dokumentasi pers.</li>
                        <li><strong>Ketua Bidang Infokom (2023 – 2024):</strong> Kepemimpinan divisi media dan publikasi kemahasiswaan.</li>
                        <li><strong>Quality Control Tester:</strong> Magang pengujian perangkat lunak di PT Mitra Aplikasi Teknologi.</li>
                    </ul>

                    <h4 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#059669; margin:16px 0 6px;">Proyek Pilihan</h4>
                    <p><strong>Website Dusun Cikmas (dusuncikmas.my.id):</strong> Website profil desa & destinasi wisata terpadu.<br>
                    <strong>Sistem Deteksi Penyakit Daun Padi YOLOv8:</strong> Solusi kecerdasan buatan computer vision agrikultur.<br>
                    <strong>Game Edukasi Kartu Planet:</strong> Media interaktif visual tata surya berbasis web.</p>

                    <h4 style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#059669; margin:16px 0 6px;">Kontak Langsung</h4>
                    <p>WhatsApp: +62 8574-2976-911 | Email: hidayatrakhmat38@gmail.com | Instagram: @rakhaa_mt</p>
                </div>
            `
        }
    };

    if (cvModal && previewCvButtons.length) {
        previewCvButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = btn.getAttribute('data-cv-type') || 'ats';
                const data = cvData[type];

                if (data) {
                    if (cvModalTitle) cvModalTitle.textContent = data.title;
                    if (cvModalContent) cvModalContent.innerHTML = data.html;
                    if (cvDownloadBtn) {
                        cvDownloadBtn.href = data.downloadUrl;
                        cvDownloadBtn.download = data.fileName;
                        cvDownloadBtn.innerHTML = `
                            <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Unduh File ${type.toUpperCase()} (PDF)
                        `;
                    }
                    cvModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeCvModal = () => {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (cvModalClose) {
            cvModalClose.addEventListener('click', closeCvModal);
        }

        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                closeCvModal();
            }
        });
    }

    /* ==========================================================================
       7. CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const category = document.getElementById('category')?.value || 'Kolaborasi Proyek';
            const subject = document.getElementById('subject')?.value.trim() || 'Pesan dari Portofolio';
            const message = document.getElementById('message')?.value.trim();

            const destinationEmail = 'hidayatrakhmat38@gmail.com';
            const emailSubject = `[Portofolio - ${category}] ${subject}`;
            const emailBody = `Halo Rakhmat Hidayat,\n\nNama: ${name}\nEmail: ${email}\nKeperluan: ${category}\n\nPesan:\n${message}\n\nSalam,\n${name}`;

            if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                formStatus.innerHTML = `
                    <div style="display:flex; align-items:flex-start; gap:8px;">
                        <svg class="icon-svg icon-svg-sm" style="color:#059669; margin-top:2px;" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        <div>
                            <strong>Terima kasih, ${name}!</strong> Pesan Anda siap dikirimkan.
                            <br><small>Aplikasi email Anda akan terbuka. Anda juga dapat langsung menghubungi via <a href="https://wa.me/6285742976911?text=${encodeURIComponent('Halo Rakhmat Hidayat, saya ' + name + ' ingin berdiskusi terkait ' + category + ': ' + message)}" target="_blank" style="text-decoration:underline; font-weight:700;">WhatsApp di sini (+62 8574-2976-911) ↗</a></small>
                        </div>
                    </div>
                `;
            }

            // Trigger mailto after brief delay
            setTimeout(() => {
                window.location.href = `mailto:${destinationEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            }, 800);
        });
    }

});
