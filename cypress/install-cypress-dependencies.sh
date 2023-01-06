yum install -y libXdmcp
yum install -y libXfont2

yum install -y glibc-langpack-en
yum install -y nss-softokn-freebl.rpm 
yum install -y glibc-common
yum install -y glibc
yum install -y glibc-devel

yum install -y libxkbfile
yum install -y xkbcomp
yum install -y xorg-x11-server-common

yum install -y gtk2

yum install -y libxkbcommon
yum install -y 	wayland-protocols-devel

yum install -y libXrender
yum install -y libXrender-devel
yum install -y libXfixes
yum install -y libXfixes-devel
yum install -y libXcursor
yum install -y libXcursor-devel
yum install -y libXcomposite
yum install -y libXcomposite
yum install -y libXdamage
yum install -y libXdamage-devel
yum install -y libXext
yum install -y libXext-devel
yum install -y libXi
yum install -y libXi-devel
yum install -y libXinerama
yum install -y libXinerama-devel
yum install -y libXrandr
yum install -y libXrandr-devel

yum install -y hwdata
yum install -y libpciaccess
yum install -y libxshmfence
yum install -y libdrm
yum install -y mesa-libgbm
yum install -y mesa-libglapi
yum install -y zlib
yum install -y zlib-devel
yum install -y libpng
yum install -y libpng-devel
yum install -y libglvnd
yum install -y libglvnd-opengl
yum install -y mesa-libEGL
yum install -y libXxf86vm
yum install -y mesa-libGL
yum install -y libglvnd-egl
yum install -y libglvnd-glx
yum install -y libglvnd-gles
yum install -y libglvnd-core-devel
yum install -y libglvnd-devel
yum install -y pixman 
yum install -y pixman-devel 
yum install -y pcre-cpp
yum install -y pcre-utf16
yum install -y pcre-utf32
yum install -y pcre
yum install -y pcre-devel
yum install -y glib2
yum install -y glib2-devel
yum install -y libuuid
yum install -y libuuid-devel

yum install -y libgomp
yum install -y libcroco
yum install -y gettext-libs
yum install -y gettext
yum install -y bzip2-devel
yum install -y expat
yum install -y expat-devel
yum install -y freetype
yum install -y freetype-devel
yum install -y fontconfig
yum install -y fontconfig-devel
yum install -y cairo
yum install -y cairo-devel
yum install -y cairo-gobject
yum install -y cairo-gobject-devel

yum install -y graphite2
yum install -y graphite2-devel
yum install -y libXft
yum install -y libXft-devel
yum install -y harfbuzz-icu
yum install -y harfbuzz
yum install -y harfbuzz-devel
yum install -y fribidi
yum install -y fribidi-devel
yum install -y pango
yum install -y pango-devel
yum install -y libepoxy
yum install -y libepoxy-devel

yum install -y jasper-libs
yum install -y gdk-pixbuf2-xlib
yum install -y gdk-pixbuf2
yum install -y gdk-pixbuf2-devel
yum install -y libxkbcommon-devel

yum install -y libwayland-egl
yum install -y libwayland-server
yum install -y libwayland-client
yum install -y libwayland-cursor
yum install -y wayland-protocols-devel
yum install -y wayland-devel
yum install -y pkgconfig
yum install -y atk
yum install -y atk-devel

yum install -y dbus-libs
yum install -y dbus 
yum install -y dbus-devel
yum install -y at-spi2-core
yum install -y at-spi2-core-devel
yum install -y at-spi2-atk
yum install -y at-spi2-atk-devel

yum install -y xorg-x11-xauth
yum install -y libXtst*
yum install -y libXScrnSaver*
yum install -y GConf2*
yum install -y alsa-lib*
yum install -y libnss3.so

##
# The follow are not found in any of the installed dependency repositories, 
# so installing them directly. For updates, search https://centos.pkgs.org/
##
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/gtk3-3.22.30-5.el7.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/gtk3-devel-3.22.30-5.el7.x86_64.rpm

dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/libXfont2-2.0.3-1.el7.x86_64.rpm

dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libxkbfile-1.1.0-1.el8.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/7/os/x86_64/Packages/xorg-x11-xkb-utils-7.7-14.el7.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/8-stream/AppStream/x86_64/os/Packages/xorg-x11-server-common-1.20.10-1.el8.x86_64.rpm

dnf install -y https://vault.centos.org/centos/8/AppStream/x86_64/os/Packages/libXdmcp-1.1.3-1.el8.x86_64.rpm
dnf install -y http://mirror.centos.org/centos/8-stream/AppStream/x86_64/os/Packages/xorg-x11-server-Xvfb-1.20.10-1.el8.x86_64.rpm