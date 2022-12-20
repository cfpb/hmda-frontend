dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXdmcp-1.1.2-6.el7.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXfont2-2.0.3-1.el7.i686.rpm

rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/glibc-langpack-en-2.28-164.el8.x86_64.rpm --force --nodeps
dnf install -y http://mirror.centos.org/centos/7/updates/x86_64/Packages/nss-softokn-freebl-3.79.0-4.el7_9.x86_64.rpm 
dnf install glibc-common.x86_64
dnf install glibc.x86_64
dnf install glibc
dnf install glibc-devel.x86_64 -y
rpm -i https://rpmfind.net/linux/centos-stream/9-stream/BaseOS/x86_64/os/Packages/glibc-2.34-40.el9.x86_64.rpm --force --nodeps
rpm -i https://rpmfind.net/linux/mageia/distrib/cauldron/x86_64/media/core/release/glibc-2.36-27.mga9.x86_64.rpm --force --nodeps

dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libxkbfile-1.0.9-3.el7.x86_64.rpm
dnf install -y http://mirror.stream.centos.org/9-stream/AppStream/x86_64/os/Packages/xkbcomp-1.4.4-4.el9.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/xorg-x11-server-common-1.20.4-10.el7.x86_64.rpm

dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/gtk2-2.24.32-5.el8.x86_64.rpm

dnf install -y 	http://mirror.centos.org/centos/7/os/x86_64/Packages/libxkbcommon-0.7.1-3.el7.x86_64.rpm --allowerasing
dnf install -y 	http://mirror.centos.org/centos/7/os/x86_64/Packages/wayland-protocols-devel-1.14-1.el7.noarch.rpm --allowerasing

dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXrender-0.9.10-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXrender-devel-0.9.10-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXfixes-5.0.3-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXfixes-devel-5.0.3-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXcursor-1.1.15-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXcursor-devel-1.1.15-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXcomposite-0.4.4-4.1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXcomposite-devel-0.4.4-4.1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXdamage-1.1.4-4.1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXdamage-devel-1.1.4-4.1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXext-1.3.3-3.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXext-devel-1.3.3-3.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXi-1.7.9-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXi-1.7.9-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXi-devel-1.7.9-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXinerama-1.1.3-2.1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXinerama-devel-1.1.3-2.1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXrandr-1.5.1-2.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXrandr-devel-1.5.1-2.el7.x86_64.rpm --allowerasing

rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/hwdata-0.314-8.10.el8.noarch.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/libpciaccess-0.14-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libxshmfence-1.3-2.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libdrm-2.4.106-2.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/mesa-libgbm-21.1.5-1.el8.x86_64.rpm --force --nodeps
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/mesa-libglapi-21.1.5-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/zlib-1.2.11-17.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/zlib-devel-1.2.11-17.el8.x86_64.rpm --force
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/libpng-1.5.13-8.el7.x86_64.rpm --force
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/libpng-devel-1.5.13-8.el7.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libglvnd-1.3.2-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libglvnd-opengl-1.3.2-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/mesa-libEGL-21.1.5-1.el8.x86_64.rpm --force --nodeps
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libXxf86vm-1.1.4-9.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/mesa-libGL-21.1.5-1.el8.x86_64.rpm --force --nodeps
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libglvnd-egl-1.3.2-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libglvnd-glx-1.3.2-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libglvnd-gles-1.3.2-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libglvnd-core-devel-1.3.2-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libglvnd-devel-1.3.2-1.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/pixman-0.38.4-1.el8.x86_64.rpm --force 
rpm -i https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/pixman-devel-0.38.4-1.el8.x86_64.rpm --force 
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/pcre-cpp-8.42-6.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/pcre-utf16-8.42-6.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/pcre-utf32-8.42-6.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/pcre-8.42-6.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/pcre-devel-8.42-6.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/glib2-2.56.4-156.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/glib2-devel-2.56.4-156.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/libuuid-2.32.1-28.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/libuuid-devel-2.32.1-28.el8.x86_64.rpm --force


rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/libgomp-8.5.0-4.el8_5.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/libcroco-0.6.12-4.el8_2.1.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/gettext-libs-0.19.8.1-17.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/gettext-0.19.8.1-17.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/bzip2-devel-1.0.6-26.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/expat-2.2.5-4.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/expat-devel-2.2.5-4.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/freetype-2.9.1-4.el8_3.1.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/freetype-devel-2.9.1-4.el8_3.1.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/fontconfig-2.13.1-4.el8.x86_64.rpm --force
rpm -i https://vault.centos.org/centos/8/BaseOS/x86_64/os/Packages/fontconfig-devel-2.13.1-4.el8.x86_64.rpm --force
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/cairo-1.15.12-4.el7.x86_64.rpm --force --nodeps
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/cairo-devel-1.15.12-4.el7.x86_64.rpm --force
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/cairo-gobject-1.15.12-4.el7.x86_64.rpm --force
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/cairo-gobject-devel-1.15.12-4.el7.x86_64.rpm --force

dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/graphite2-1.3.10-10.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/graphite2-devel-1.3.10-10.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libXft-2.3.3-1.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libXft-devel-2.3.3-1.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/harfbuzz-icu-1.7.5-3.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/harfbuzz-1.7.5-3.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/harfbuzz-devel-1.7.5-3.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/fribidi-1.0.4-8.el8.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/fribidi-devel-1.0.4-8.el8.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/pango-1.42.4-4.el7_7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/pango-devel-1.42.4-4.el7_7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libepoxy-1.5.2-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libepoxy-devel-1.5.2-1.el7.x86_64.rpm --allowerasing



dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/jasper-libs-1.900.1-33.el7.x86_64.rpm --allowerasing
dnf install -y https://vault.centos.org/centos/8/PowerTools/x86_64/os/Packages/gdk-pixbuf2-xlib-2.36.12-5.el8.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/gdk-pixbuf2-2.36.12-3.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/gdk-pixbuf2-devel-2.36.12-3.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libxkbcommon-devel-0.7.1-3.el7.x86_64.rpm --allowerasing

dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libwayland-egl-1.15.0-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libwayland-server-1.15.0-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libwayland-client-1.15.0-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libwayland-cursor-1.15.0-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/wayland-protocols-devel-1.14-1.el7.noarch.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/wayland-devel-1.15.0-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/pkgconfig-0.27.1-4.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/atk-2.28.1-2.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/atk-devel-2.28.1-2.el7.x86_64.rpm --allowerasing

rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/dbus-libs-1.10.24-15.el7.x86_64.rpm --force
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/dbus-1.10.24-15.el7.x86_64.rpm  --force
rpm -i http://mirror.centos.org/centos/7/os/x86_64/Packages/dbus-devel-1.10.24-15.el7.x86_64.rpm --force
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-core-2.28.0-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-core-devel-2.28.0-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-atk-2.26.2-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-atk-devel-2.26.2-1.el7.x86_64.rpm --allowerasing
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/gtk3-3.22.30-5.el7.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/gtk3-devel-3.22.30-5.el7.x86_64.rpm


dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXfont2-2.0.3-1.el7.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/8-stream/AppStream/x86_64/os/Packages/xorg-x11-server-common-1.20.10-1.el8.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/8-stream/AppStream/x86_64/os/Packages/xorg-x11-server-Xvfb-1.20.10-1.el8.x86_64.rpm